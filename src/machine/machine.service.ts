import { Injectable } from '@nestjs/common';
import { Machine, Customer } from 'src/entities';
import { DataSource } from 'typeorm';
import { CreateMachineDto } from './dto';

@Injectable()
export class MachineService {
  constructor(private dataSource: DataSource) {}

  findAll(): Promise<Machine[]> {
    return this.dataSource
      .getRepository(Machine)
      .find({ relations: ['customer'] });
  }

  async create(machineData: CreateMachineDto): Promise<Machine> {
    const machineRepository = this.dataSource.getRepository(Machine);
    const customerRepository = this.dataSource.getRepository(Customer);

    let customer: Customer | null = null;
    if (machineData.customerId) {
      customer = await customerRepository.findOneBy({
        id: machineData.customerId,
      });
      if (!customer) {
        throw new Error(`Customer with ID ${machineData.customerId} not found`);
      }
    }

    const machine = machineRepository.create({
      ...machineData,
      customer: customer || undefined, // Associate the resolved customer entity or leave undefined
    });

    return machineRepository.save(machine);
  }

  async updateStatus(id: string): Promise<void> {
    const machineRepository = this.dataSource.getRepository(Machine);

    const machine = await machineRepository.findOneBy({ id });

    if (!machine) {
      throw new Error(`Machine with ID ${id} not found`);
    }

    await machineRepository.update(id, { producing: !machine.producing });
  }
}
