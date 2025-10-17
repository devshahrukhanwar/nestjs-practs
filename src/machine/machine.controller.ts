import { Body, Controller, Get, Patch, Post, Put, Param } from '@nestjs/common';
import { MachineService } from './machine.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMachineDto } from './dto';

@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  getMachines(): any {
    return this.machineService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createMachine(@Body() machineData: CreateMachineDto): any {
    return this.machineService.create(machineData);
  }

  @Put(':id/update-producing')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateMachineStatus(@Param('id') id: string): any {
    this.machineService.updateStatus(id);

    return {
      message: `Machine with ID ${id} updated successfully`,
    };
  }
}
