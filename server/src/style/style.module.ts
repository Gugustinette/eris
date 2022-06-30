import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';
import { DatabaseModule } from 'src/database/database.module';
import { styleProviders } from './style.providers';
import { HtmlUtil } from 'src/util/html.util';
import { FormatageUtil } from 'src/util/formatage.util';

@Module({
  imports: [DatabaseModule],
  controllers: [StyleController],
  providers: [StyleService, HtmlUtil, FormatageUtil, ...styleProviders],
})
export class StyleModule {}
