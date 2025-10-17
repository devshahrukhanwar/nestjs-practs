import { Controller, Get, Query, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers(@Query() query: any): any {
    const search: string | number = query['search'];

    return this.customerService.findAll(search);
  }
}
