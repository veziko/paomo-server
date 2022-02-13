import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, wxOpenidDto } from './user.dto';
import axios from 'axios'
import paomoConfig from '../../config/paomo'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async wxOpenid(code: string): Promise<wxOpenidDto> {
    return axios(`https://api.weixin.qq.com/sns/jscode2session`, {
      params: {
        grant_type: 'authorization_code',
        appid: paomoConfig.AppID,
        secret: paomoConfig.AppSecret,
        js_code: code,
      }
    })
    .then(res =>res.data)
  }

  async single(openid: string): Promise<User> {
    return this.userModel.findOne({
      openid
    })
  }

  async me(auth: string): Promise<User> {
    const { openid } = await this.wxOpenid(auth)
    return this.single(openid)
  }



  async create(createUserDto: CreateUserDto): Promise<User> {
    const code = createUserDto.code
    const { openid } = await this.wxOpenid(code)
    const user = await this.single(openid)
    if ( user ) {
      throw new ConflictException()
    }
    const userData = {
      openid: openid,
      created: Date.now(),
      ...createUserDto,
    }
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  
  
}
