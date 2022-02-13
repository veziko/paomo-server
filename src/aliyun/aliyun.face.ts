// This file is auto-generated, don't edit it
import facebody20191230, * as $facebody20191230 from '@alicloud/facebody20191230';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import * as $tea from '@alicloud/tea-typescript';
import aliyunConfig from '../../config/aliyun'

export default class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): facebody20191230 {
    let config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId: accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = "facebody.cn-shanghai.aliyuncs.com";
    return new facebody20191230(config);
  }

  static async main(imageURL, algoType) {
    let client = Client.createClient(aliyunConfig.AccessKeyID, aliyunConfig.AccessKeySecret);
    let generateHumanAnimeStyleRequest = new $facebody20191230.GenerateHumanAnimeStyleRequest({
      imageURL,
      algoType,
    });
    return client.generateHumanAnimeStyle(generateHumanAnimeStyleRequest);
  }

}

// anime：日漫风
// 3d：3D特效
// handdrawn：手绘风
// sketch：铅笔画
// artstyle：艺术特效

