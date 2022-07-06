import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from "./user/user.module";

@Module({
  imports: [AuthModule,BookmarkModule,UserModule,MongoModule]
})

export class AppModule {}
