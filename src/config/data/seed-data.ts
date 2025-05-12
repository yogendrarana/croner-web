import { jobLastRunStatusEnum } from './../../server/db/schemas/cronjob';
import { faker } from '@faker-js/faker';

import { CronJobInsert, CronJobTable } from '@/server/db/schema';
import { RoleEnum, UserStatusEnum } from '@/types/enums/user-enums';
import { TCronJobLastRunStatus, TCronJobStatus } from '@/app/dashboard/cronjobs/_lib/validations';

// Generate a random user
const generateUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement([RoleEnum.ADMIN, RoleEnum.CUSTOMER]),
  status: UserStatusEnum.ACTIVE,
  emailVerified: true,
  avatar: faker.image.avatar(),
});

// Generate a random cronjob
const generateCronjob = (): CronJobInsert => ({
  id: faker.string.uuid(),
  userId: '',
  name: faker.helpers.arrayElement([
    'Daily Health Check',
    'Weekly Backup',
    'Monthly Report',
    'Data Sync',
    'Email Digest',
    'System Maintenance',
    'Performance Monitor',
    'Security Scan',
    'Data Cleanup',
    'API Health Check',
    'User Activity Report',
    'Database Backup',
    'Cache Cleanup',
    'Log Rotation',
    'Disk Space Monitor',
    'Service Health Check',
    'Data Migration',
    'Email Notification',
    'Data Import',
    'Data Export',
    'System Update',
    'User Sync',
  ]),
  url: faker.internet.url(),
  description: faker.lorem.sentence(),
  schedule: faker.helpers.arrayElement(['0 0 * * *', '0 0 * * 0', '0 0 1 * *', '0 */6 * * *', '0 0,12 * * *']),
  nextRun: faker.date.future(),
  lastRun: faker.date.past(),
  timezone: faker.helpers.arrayElement(['UTC', 'America/New_York', 'Europe/London', 'Asia/Katmandu']),
  active: true,
  status: faker.helpers.arrayElement(CronJobTable.status.enumValues.map(status => status.toLowerCase() as TCronJobStatus)),
  lastRunStatus: faker.helpers.arrayElement(CronJobTable.lastRunStatus.enumValues.map(status => status as TCronJobLastRunStatus)),
  maxRetries: faker.number.int({ min: 1, max: 5 }),
  timeoutSeconds: faker.number.int({ min: 30, max: 300 }),
  notifyOnFailure: true,
  httpMethod: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
});

// Generate multiple users and cronjobs
export const users = Array.from({ length: 10 }, generateUser);
export const cronjobs = Array.from({ length: 40 }, generateCronjob);

// Common password for all users
export const DEFAULT_PASSWORD = 'password1A@';
