
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AxiosHeaders } from 'axios';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should return cached data if available', async () => {
    const mockData = { data: [{ name: 'bulbasaur' }] };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(mockData);

    const data = await service.fetchPokimons(20,2);
    expect(data).toEqual(mockData);
    expect(cacheManager.get).toHaveBeenCalledWith('pokimons-20-2');
  });

  it('should fetch data from API if not cached', async () => {
    const mockData = { results: [{ name: 'bulbasaur' }] };
    const mockAxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
        method: 'get',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=100',
      },
    };

    jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse));

    const data = await service.fetchPokimons(10,1);
    expect(data).toEqual(mockData);
    expect(cacheManager.set).toHaveBeenCalledWith('pokimons-10-1', mockData, 60*60*1000 );
  });
});
