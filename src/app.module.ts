import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { TvshowsModule } from './tvshows/tvshows.module';
import { MyListModule } from './mylist/mylist.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * AppModule serves as the root module of the application.
 * It imports other feature modules (Movies, Tvshows, MyList) and configures the database connection.
 */
@Module({
  imports: [
    // Load environment variables using @nestjs/config (recommended for production environments)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure MongoDB connection with environment variables
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    // Import feature modules
    MoviesModule,
    TvshowsModule,
    MyListModule,
  ],
})
export class AppModule {}
