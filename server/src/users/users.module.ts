import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  exports: [UsersService],
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
