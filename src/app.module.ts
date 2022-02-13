import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { AliyunModule } from './aliyun/aliyun.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/paomo'), ImageModule, UserModule, AliyunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
