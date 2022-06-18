
export class CreateAliyunDto {
    name: string;
    mimeType: string;
    hash: string;
    userId: string;
    size: number;
    width: number;
    height: number;
    created: number;
}


export class OssCallbackDto {
    md5: string;
    filename: string;
    height: string;
    mimeType: string;
    size: string;
    width: string;
    userid: string;
}