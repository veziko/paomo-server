import { Controller, Param, Query, Body, Headers, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    me(@Headers('auth') auth: string) {
        return this.userService.me(auth)
    }

    @Put()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}
