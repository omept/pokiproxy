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

    async getPokemonList(): Promise<any> {
        const cacheKey = 'pokemonList';

        // Check cache first
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            console.log("cahce data");
            return cachedData;
        }
        // Fetch data from the PokéAPI
        const response = await firstValueFrom(
            this.httpService.get(`${this.API_URL}?limit=100`),
        );
        const data = response.data;
        console.log("non cache data");

        // Store in cache
        await this.cacheManager.set(cacheKey, data);

        return data;
    }
}
