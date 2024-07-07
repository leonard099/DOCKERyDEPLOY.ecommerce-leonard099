import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './Products/Products.module';
import { UsersModule } from './Users/Users.module';
import {AuthModule} from './Auth/Auth.Module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {ConfigService} from '@nestjs/config';
import typeorm from './Config/typeorm';
import {CategoriesModule} from './Categories/Categories.module';
import {OrdersModule} from './Ordes/Ordes.module'
import { CloudinaryModule } from './Cloudinary/Cloudinary.module';
  import {JwtModule} from '@nestjs/jwt'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
        inject:[ConfigService],
        useFactory: (configService: ConfigService) => {
          const config = configService.get('typeorm')
          return config
        }
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn:'1h'},
      secret: process.env.JWT_SECRET
    }),
    CategoriesModule, ProductModule, OrdersModule ,UsersModule, AuthModule, CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
