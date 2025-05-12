import { hash } from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { users, cronjobs, DEFAULT_PASSWORD } from '@/config/data/seed-data';
import { UserTable, AccountTable, SessionTable, CronJobTable } from '@/server/db/schema';
import db from '@/server/db';

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    await db.transaction(async tx => {
      // Clear existing data
      await tx.delete(CronJobTable);
      await tx.delete(SessionTable);
      await tx.delete(AccountTable);
      await tx.delete(UserTable);
      console.log('🗑️  Cleared existing data');

      // Insert users + accounts
      for (const user of users) {
        await tx.insert(UserTable).values({
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const hashedPassword = await hash(DEFAULT_PASSWORD, 10);
        await tx.insert(AccountTable).values({
          id: faker.string.uuid(),
          userId: user.id,
          providerId: 'credentials',
          accountId: user.email,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      console.log('👥 Created users and accounts');

      // Insert cronjobs
      for (const cronjob of cronjobs) {
        const userId = users[cronjobs.indexOf(cronjob) % users.length].id;
        await tx.insert(CronJobTable).values({
          ...cronjob,
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      console.log('⏰ Created cronjobs');
    });

    console.log('✅ Database seed completed successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('✨ Seed completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  });
