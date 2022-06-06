import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';
import { DatabaseModule } from 'src/database/database.module';
import { styleProviders } from './style.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StyleController],
  providers: [StyleService, ...styleProviders],
})
export class StyleModule {}
