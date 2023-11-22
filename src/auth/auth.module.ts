import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        auth: {
          username: configService.get<string>('MONGODB_USERNAME'),
          password: configService.get<string>('MONGODB_PASSWORD'),
        },
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        auth: {
          username: configService.get<string>('MONGODB_USERNAME_2'),
          password: 'password12345',
        },
        uri: configService.get<string>('MONGODB_URI_2'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
