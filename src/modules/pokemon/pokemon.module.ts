import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/controller';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonService } from './services/service';

@Module({
  providers: [PokemonService],
  controllers: [PokemonController],
  imports: [CacheModule.register()],
})
export class PokemonModule {}
