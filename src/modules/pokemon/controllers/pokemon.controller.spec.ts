import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../services/pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getPokemonList: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should return Pokémon data', async () => {
    const mockData = { results: [{ name: 'bulbasaur' }] };
    jest.spyOn(service, 'getPokemonList').mockResolvedValue(mockData);

    const result = await controller.getPokemon();
    expect(result).toEqual({ success: true, data: mockData });
  });
});
