import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();

    return { message: 'User list', data: users };
  }
}
