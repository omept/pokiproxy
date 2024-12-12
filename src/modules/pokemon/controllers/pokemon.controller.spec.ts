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
            fetchPokimons: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should return Pokémon data', async () => {
    const mockData =  [{ name: 'bulbasaur' }] ;
    jest.spyOn(service, 'fetchPokimons').mockResolvedValue(mockData);

    const result = await controller.getPokimons();
    expect(result).toEqual( mockData );
  });
});
