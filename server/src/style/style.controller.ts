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
  Query,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { StyleService } from './style.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StyleGuard } from './style.guard';
import { HtmlUtil } from 'src/util/html.util';
import { FormatageUtil } from 'src/util/formatage.util';
import { FilesInterceptor } from '@nestjs/platform-express';
// Import fs
import * as fs from 'fs';

@Controller('style')
export class StyleController {
  constructor(
    private readonly styleService: StyleService,
    private readonly htmlUtil: HtmlUtil,
    private readonly formatageUtil: FormatageUtil,
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

  @Get('search') // Use Query
  search(@Query('query') query: string) {
    return this.styleService.search(query).then((styles) => {
      return styles.map((style) => {
        // Remove 'css' property from each style object
        style.css = undefined;
        return style;
      });
    });
  }

  @Get('download/:id')
  downloadOne(@Param('id') id: string) {
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

  @UseGuards(JwtAuthGuard, StyleGuard)
  @Post('images/:id')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { fileSize: 1000000 },
    }),
  )
  uploadImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    // Initialize imageArray
    const images = [];
    // Get images' ids keeped by user if any
    let old_images = undefined;
    if (body.imagesID) {
      try {
        old_images = JSON.parse(body.imagesID);
      } catch (e) {
        return;
      }
    }

    // If not exist, create folder ./cloud/images/[ID]
    if (!fs.existsSync(`./cloud/images/${id}`)) {
      fs.mkdirSync(`./cloud/images/${id}`);
    } else {
      if (old_images && old_images.length > 0) {
        old_images.forEach((imageId) => {
          if (
            imageId !== 'new-image' &&
            !fs.existsSync(`./cloud/images/${id}/${imageId}.png`)
          )
            old_images.splice(1, old_images.indexOf(imageId));
        });
        // Remove images inside the folder
        fs.readdirSync(`./cloud/images/${id}`).forEach((file) => {
          // Get file name without .png
          const filename = file.split('.')[0];
          // If image isn't keeped by user
          if (old_images.indexOf(filename) === -1) {
            // Delete image
            fs.unlinkSync(`./cloud/images/${id}/${file}`);
          }
        });
      } else {
        // Remove any images inside the folder
        fs.readdirSync(`./cloud/images/${id}`).forEach((file) => {
          fs.unlinkSync(`./cloud/images/${id}/${file}`);
        });
      }
    }

    // Write the files to ./cloud/images/[ID]/[FILE]
    files.forEach((file) => {
      // Create image id
      const imageId = this.formatageUtil.createIdFromImage(file.buffer);
      if (old_images && old_images.length > 0) {
        if (old_images.indexOf('new-image') !== -1) {
          old_images[old_images.indexOf('new-image')] = imageId;
          // If not exist, write file
          if (!fs.existsSync(`./cloud/images/${id}/${imageId}.png`)) {
            fs.writeFileSync(
              `./cloud/images/${id}/${imageId}.png`,
              file.buffer,
            );
          }
        }
      } else {
        // Add id to image array
        images.push(imageId);
        // If not exist, write file
        if (!fs.existsSync(`./cloud/images/${id}/${imageId}.png`)) {
          fs.writeFileSync(`./cloud/images/${id}/${imageId}.png`, file.buffer);
        }
      }
    });

    // Build final images array
    let final_images = undefined;
    if (old_images && old_images.length > 0) {
      final_images = old_images;
    } else {
      final_images = images;
    }
    final_images.length = 3;

    // Return the images
    return this.styleService.setImages(id, final_images);
  }

  @Get('images/:id/:image')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { fileSize: 1000000 },
    }),
  )
  getImage(@Param('id') id: string, @Param('image') image: string, @Res() res) {
    // Check if the image exists
    if (fs.existsSync(`./cloud/images/${id}/${image}.png`)) {
      // Create read stream
      const readStream = fs.createReadStream(
        `./cloud/images/${id}/${image}.png`,
      );
      // Set the content type to png
      res.set('Content-Type', 'image/png');
      // Pipe the read stream to the response
      readStream.pipe(res);
    } else {
      // Send json error
      res.status(404).send({
        error: 'Image not found',
      });
    }
  }
}
