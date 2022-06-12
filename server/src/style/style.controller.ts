import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StyleService } from './style.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StyleGuard } from './style.guard';
import { HtmlUtil } from 'src/util/html.util';

@Controller('style')
export class StyleController {
  constructor(
    private readonly styleService: StyleService,
    private readonly htmlUtil: HtmlUtil,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Request() req, @Body() createStyleDto: CreateStyleDto) {
    // Remove HTML tags from the css
    createStyleDto.css = this.htmlUtil.purgeHtml(createStyleDto.css);
    return this.styleService.create(createStyleDto, req.user);
  }

  @Get('get')
  findAll() {
    return this.styleService.findAll().then((styles) => {
      return styles.map((style) => {
        // Remove 'css' property from each style object
        style.css = undefined;
        return style;
      });
    });
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.styleService.findOne(id).then((style) => {
      // Remove 'css' property from each style object
      style.css = undefined;
      return style;
    });
  }

  @Get('download/:id')
  downloadOne(@Request() req, @Param('id') id: string) {
    return this.styleService.findOne(id).then((style) => {
      // Increase the number of downloads
      style.nbDownloads += 1;
      // Update the style
      return style.save();
    });
  }

  @UseGuards(JwtAuthGuard, StyleGuard)
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
    // Remove HTML tags from the css
    updateStyleDto.css = this.htmlUtil.purgeHtml(updateStyleDto.css);
    return this.styleService.update(id, updateStyleDto);
  }

  @UseGuards(JwtAuthGuard, StyleGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.styleService.remove(id);
  }
}
