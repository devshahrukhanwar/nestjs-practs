import { AppDataSource } from './data-source';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import * as argon from 'argon2';
import { Customer } from './entities/customer.entity';

async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const hash = await argon.hash('password123');

  // Seed Users
  const users = [
    {
      email: 'john.nomad@example.com',
      password: hash,
      firstName: 'John',
      lastName: 'Nomad',
    },
    {
      email: 'jane.nomad@example.com',
      password: hash,
      firstName: 'Jane',
      lastName: 'Nomad',
    },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOneBy({ email: user.email });
    if (!existingUser) {
      const newUser = userRepository.create(user);
      await userRepository.save(newUser);
    }
  }

  console.log('Seed data inserted successfully!');
}

async function seedCustomers(dataSource: DataSource) {
  const customerRepository = dataSource.getRepository(Customer);

  const customers = [
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '123-456-7890',
    },
    {
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      phone: '234-567-8901',
    },
    {
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      phone: '345-678-9012',
    },
    {
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      phone: '456-789-0123',
    },
    {
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com',
      phone: '567-890-1234',
    },
  ];

  for (const customer of customers) {
    const existingCustomer = await customerRepository.findOneBy({
      email: customer.email,
    });
    if (!existingCustomer) {
      const newCustomer = customerRepository.create(customer);
      await customerRepository.save(newCustomer);
    }
  }

  console.log('Customer seed data inserted successfully!');
}

async function seedMachines(dataSource: DataSource) {
  const machineRepository = dataSource.getRepository('machines');

  const machines = [
    {
      name: 'Machine A',
      description: 'Description for Machine A',
      location: 'Location A',
      producing: true,
    },
  ];

  for (const machine of machines) {
    const existingMachine = await machineRepository.findOneBy({
      name: machine.name,
    });
    if (!existingMachine) {
      const newMachine = machineRepository.create(machine);
      await machineRepository.save(newMachine);
    }
  }

  console.log('Machine seed data inserted successfully!');
}

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('Database connected!');
    // await seedUsers(dataSource);
    // await seedCustomers(dataSource);
    await seedMachines(dataSource);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });
