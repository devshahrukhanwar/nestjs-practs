import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Customer } from './customer.entity';

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Exclude()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column()
  @IsString()
  location: string;

  @Column({ default: true })
  @IsBoolean()
  producing: boolean;

  @ManyToOne(() => Customer, (customer) => customer.machines, {
    onDelete: 'CASCADE',
  })
  customer: Customer;
}
