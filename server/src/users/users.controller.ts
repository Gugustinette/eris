import { Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserGuard } from './user.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
