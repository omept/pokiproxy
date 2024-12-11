import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonService } from '../services/service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemon() {
    try {
      const data = await this.pokemonService.getPokemonList();
      return { success: true, data };
    } catch {
      throw new HttpException('Failed to fetch Pokémon data.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
