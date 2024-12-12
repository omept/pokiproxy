import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async getPokimons(@Query('limit') limit: number = 10, @Query('page') page: number = 1): Promise<any> {
    try {
      const startTime = Date.now();
      const pokimons = await this.pokemonService.fetchPokimons(limit, page);
      const endTime = Date.now();
      console.log(`Request took ${(endTime - startTime) / 1000} seconds`);
      return pokimons;
    } catch {
      throw new HttpException('Failed to fetch Pokémon data.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
