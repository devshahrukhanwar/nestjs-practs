import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AppDataSource } from './data-source';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User]),
    UserModule,
    CustomerModule,
  ],
})
export class AppModule {}
