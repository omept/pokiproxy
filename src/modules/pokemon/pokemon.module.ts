import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonService } from './services/pokemon.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [PokemonService],
  controllers: [PokemonController],
  imports: [HttpModule, CacheModule.register()],
})
export class PokemonModule { }
