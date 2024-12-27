import { Controller, DefaultValuePipe, Get, HttpException, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { IsPositivePipe } from '../pipes/is-positive.pipe';

const defaultLimit = 10;
const defaultPage = 1;
@Controller('api/pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async getPokimons(@Query('limit', new DefaultValuePipe(defaultLimit), ParseIntPipe, IsPositivePipe) limit: number = defaultLimit, @Query('page',  new DefaultValuePipe(defaultPage), ParseIntPipe, IsPositivePipe) page: number = defaultPage): Promise<any> {
    try {
      const startTime = Date.now();
      page = page === 0 ? defaultPage: page;
      limit = limit === 0 ? defaultLimit: limit;
      const pokimons = await this.pokemonService.fetchPokimons(limit, page);
      const endTime = Date.now();
      console.log(`Request took ${(endTime - startTime) / 1000} seconds`);
      return pokimons;
    } catch {
      throw new HttpException('Failed to fetch Pokémon data.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
