export class CreateUserDto {
    code: string;
    name: string;
    avatar: string;
    gender: number;
    country: string;
    province: string;
    city: string;
}


export class wxOpenidDto {
    session_key: string;
    openid: string
}