import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  getUsers() {
    return this.dataSource.getRepository(User).find();
  }
}
