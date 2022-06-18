import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './image.schema';
import { CreateImageDto } from './image.dto';
import faceApi from '../aliyun/aliyun.face'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

  async list() {
    return []
  }

  async single(hash): Promise<Image> {
    return this.imageModel.findOne({
      hash
    })
  }

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const createdImage = new this.imageModel(createImageDto);
    return createdImage.save();
  }

  async anime(ImageURL, AlgoType) {
    const {body} = await faceApi.main(ImageURL, AlgoType)
    const {imageURL} = body.data
    return imageURL
  }
}
