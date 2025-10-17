import { AppDataSource } from './data-source';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import * as argon from 'argon2';

async function seedDatabase(dataSource: DataSource) {
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

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('Database connected!');
    await seedDatabase(dataSource);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });
