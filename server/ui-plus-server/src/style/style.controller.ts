import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StyleService } from './style.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('style')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStyleDto: CreateStyleDto) {
    return this.styleService.create(createStyleDto);
  }

  @Get()
  findAll() {
    return this.styleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.styleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
    return this.styleService.update(id, updateStyleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.styleService.remove(id);
  }
}
