import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aliyun, AliyunDocument } from './aliyun.schema';
import { CreateAliyunDto, OssCallbackDto } from './aliyun.dto';
import aliyunConfig from '../../config/aliyun'
import { ImageService } from '../image/image.service';
import axios from 'axios'

const OSS = require('ali-oss')

const client = new OSS({
  region: aliyunConfig.OssRegion,
  accessKeyId: aliyunConfig.AccessKeyID,
  accessKeySecret: aliyunConfig.AccessKeySecret,
  bucket: aliyunConfig.OssBucket
})


@Injectable()
export class AliyunService {
  constructor(
    @InjectModel(Aliyun.name) private aliyunModel: Model<AliyunDocument>,
    private readonly imageService: ImageService
  ) {}


  async signature() {
    const end = Date.now() + 30000
    const expiration = new Date(end).toISOString()
    const policyString = JSON.stringify({
      expiration,
      conditions: [
        { bucket: `${aliyunConfig.OssBucket}` },
        ['content-length-range', 0, 1048576000],
        ['starts-with', '$key', aliyunConfig.OssRawUploadPath]
      ]
    })
    const base64Policy = Buffer.from(policyString).toString('base64')
    const callbackString = JSON.stringify({
      callbackUrl: aliyunConfig.OssCallbackUrl,
      callbackBody:
        'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&md5=${x:md5}&userid=${x:userid}',
      callbackBodyType: 'application/x-www-form-urlencoded'
    })
    const base64CallbackBody = Buffer.from(callbackString).toString('base64')
    const { createHmac } = await import('crypto')
    const signature = createHmac('sha1', aliyunConfig.AccessKeySecret)
    .update(base64Policy)
    .digest('base64')
    return {
      accessid: aliyunConfig.AccessKeyID,
      host: `//${aliyunConfig.OssBucket}.${aliyunConfig.OssEndpoint}`,
      policy: base64Policy,
      signature,
      expire: end,
      callback: base64CallbackBody,
      dir: aliyunConfig.OssRawUploadPath
    }
  }

  async callback(params: OssCallbackDto) {
    const [path, imageName] = params.filename.split('/')
    const imageData = await this.imageService.create({
      name: imageName,
      mimeType: params.mimeType,
      hash: params.md5,
      size: parseInt(params.size, 10),
      height: parseInt(params.height, 10),
      width: parseInt(params.width, 10),
      created: Date.now(),
      userId: params.userid,
      url: `https://${aliyunConfig.OssBucket}.${aliyunConfig.OssEndpoint}/${params.filename}`,
    })
    return {
      Status: 'Ok',
      ...imageData
    }
  }

  async saveUrlImage(url: string, filename: string) {
    const {data} = await axios(url, {
      responseType: 'arraybuffer'
    })

    let result = await client.put(filename, data)
    return result
  }
  
}
