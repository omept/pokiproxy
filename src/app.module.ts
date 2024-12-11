import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 600, // Cache time-to-live in seconds
      max: 100, // Maximum number of items in cache
    }),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
