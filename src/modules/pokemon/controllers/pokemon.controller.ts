import { Controller, DefaultValuePipe, Get, HttpException, HttpStatus, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { IsPositivePipe } from '../pipes/is-positive.pipe';
import PokemonResponse from '../types/pokemon-response';
import { RequestTimeLoggerInterceptor } from '../interceptors/request-time-logger.interceptor';

const defaultLimit = 10;
const defaultPage = 1;
@Controller('api/pokemons')
@UseInterceptors(RequestTimeLoggerInterceptor)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async getPokimons(@Query('limit', new DefaultValuePipe(defaultLimit), ParseIntPipe, IsPositivePipe) limit: number = defaultLimit, @Query('page',  new DefaultValuePipe(defaultPage), ParseIntPipe, IsPositivePipe) page: number = defaultPage): Promise<PokemonResponse> {
    try {
      page = page === 0 ? defaultPage: page;
      limit = limit === 0 ? defaultLimit: limit;
      const pokimons = await this.pokemonService.fetchPokimons(limit, page);
      return pokimons;
    } catch {
      throw new HttpException('Failed to fetch Pokemon data.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
