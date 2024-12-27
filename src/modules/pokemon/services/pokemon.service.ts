import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import PokemonResponse from '../types/pokemon-response';


@Injectable()
export class PokemonService {
    private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async fetchPokimons(limit: number, page: number): Promise<PokemonResponse> {
        const cacheKey = `pokimons-${limit}-${page}`;
        const cachedData = await this.cacheManager.get<PokemonResponse>(cacheKey);
        if (cachedData) {
            console.log(`Pokimons retrieved from cache: ${cacheKey}`);
            return cachedData;
        }


        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`;
        const response = await firstValueFrom(
            this.httpService.get(url, { timeout: 5000 }),
        );

        const pokemonResponse: PokemonResponse = {
            count: response.data.count,
            results: response.data.results.map((pokemon: any) => ({
                name: pokemon.name,
                url: pokemon.url,
            })),
        };

        this.cacheManager.set(cacheKey,pokemonResponse, 60 * 60 * 1000); // Cache for 1 hour
        console.log(`Pokimons fetched from external API: ${url}`);
        return pokemonResponse;
    }
}


