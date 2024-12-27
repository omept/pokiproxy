import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import PokemonResponse from '../types/pokemon-response';


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
    const mockData: PokemonResponse = { count: 1, results: [{ name: 'bulbasaur', url: '' }] };
    jest.spyOn(service, 'fetchPokimons').mockResolvedValue(mockData);

    const result = await controller.getPokimons();
    expect(result).toEqual( mockData );
  });
});
