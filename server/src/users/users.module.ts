import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { styleProviders } from 'src/style/style.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  exports: [UsersService],
  providers: [UsersService, ...userProviders, ...styleProviders],
  controllers: [UsersController],
})
export class UsersModule {}
