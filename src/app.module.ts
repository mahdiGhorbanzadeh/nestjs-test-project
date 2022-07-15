import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),MongooseModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      uri:config.get("db")
    }),
    inject: [ConfigService],

  }),AuthModule,BookmarkModule,UserModule]
})

export class AppModule {}
