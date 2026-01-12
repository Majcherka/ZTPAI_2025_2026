import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',          // Zgodne z docker-compose
      password: 'adminpassword',  // Zgodne z docker-compose
      database: 'roommate_finder_db', // Zgodne z docker-compose
      entities: [],              // Tutaj będą nasze tabele
      synchronize: true,         // UWAGA: To automatycznie tworzy tabele. Na produkcji zawsze false, do nauki true.
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}