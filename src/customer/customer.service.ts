import { Injectable } from '@nestjs/common';
import { Customer } from 'src/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(private dataSource: DataSource) {}

  findAll(search: string | number = ''): Promise<Customer[]> {
    const queryBuilder = this.dataSource
      .getRepository(Customer)
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.machines', 'machine'); // Include the machines relation

    if (search) {
      queryBuilder
        .where('customer.name ILIKE :search', {
          search: `%${search}%`,
        })
        .relation('machines');
    }

    return queryBuilder.getMany();
  }
}
