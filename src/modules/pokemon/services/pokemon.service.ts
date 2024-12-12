import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class PokemonService {
    private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async fetchPokimons(limit: number, page: number): Promise<any> {
        const cacheKey = `pokimons-${limit}-${page}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            console.log(`Pokimons retrieved from cache: ${cacheKey}`);
            return cachedData;
        }


        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`;
        const response = await firstValueFrom(
            this.httpService.get(url, { timeout: 5000 }),
        );

        this.cacheManager.set(cacheKey, response.data, 60 * 60 * 1000); // Cache for 1 hour
        console.log(`Pokimons fetched from external API: ${url}`);
        return response.data;
    }
}
