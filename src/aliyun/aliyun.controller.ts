import { Controller, Param, Query, Body, Get, Put, Post } from '@nestjs/common';
import { AliyunService } from './aliyun.service';
import { CreateAliyunDto, OssCallbackDto } from './aliyun.dto';
import faceApi from './aliyun.face'


@Controller('aliyun')
export class AliyunController {
    constructor(private readonly aliyunService: AliyunService) {}

    @Get('signature')
    signature() {
        return this.aliyunService.signature()
    }

    @Post('callback')
    callback(@Body() body: OssCallbackDto) {
        return this.aliyunService.callback(body)
    }

    @Post('face')
    face(@Body() body) {
        const {ImageURL, AlgoType} = body
        return faceApi.main(ImageURL, AlgoType)
    }

    @Get('image')
    saveUrlImage() {
        return this.aliyunService.saveUrlImage('https://thirdwx.qlogo.cn/mmopen/vi_32/bZ69C2nOeiaIYk0L3Wj92dhQVVw0vMzIDGDiauVSjZKmNkqD7ODzjh6AqyqZk0009ibicZm3kbfoUuHCMWBKerlISQ/132', 'image.png')
    }
}
