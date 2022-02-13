import { Module } from '@nestjs/common';
import { AliyunController } from './aliyun.controller';
import { AliyunService } from './aliyun.service';
import { ImageModule } from '../image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Aliyun, AliyunSchema } from './aliyun.schema';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Aliyun.name, schema: AliyunSchema }]), ImageModule, UploadModule],
  controllers: [AliyunController],
  providers: [AliyunService],
})
export class AliyunModule {}
