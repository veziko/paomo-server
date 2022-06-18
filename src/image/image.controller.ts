import { Controller, Param, Query, Body, Get, Put } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './image.dto';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    list() {
        return this.imageService.list()
    }

    @Get(':hash')
    async single(@Param('hash') hash: string) {
        const data = await this.imageService.single(hash)
        if (data) return data
        return {}
    }

    @Put()
    create(@Body() createImageDto: CreateImageDto) {
        const imageData = Object.assign({}, createImageDto)
        imageData.created = Date.now()
        return this.imageService.create(imageData)
    }
}
