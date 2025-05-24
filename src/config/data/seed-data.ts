import { jobLastRunStatusEnum } from './../../server/db/schemas/cronjob';
import { faker } from '@faker-js/faker';

import { CronJobInsert, CronJobTable, JobExecutionInsert, JobExecutionTable } from '@/server/db/schema';
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

// Generate a random job execution
const generateJobExecution = (cronJobId: string): JobExecutionInsert => {
  const startedAt = faker.date.past({ years: 1 }); // Limit to past year
  // Most jobs complete within a few seconds
  const completedAt = new Date(startedAt.getTime() + faker.number.int({ min: 100, max: 5000 }));
  
  const duration = Math.floor((completedAt.getTime() - startedAt.getTime()));
  const responseTime = faker.number.int({ min: 50, max: duration });

  return {
    id: faker.string.uuid(),
    cronJobId,
    status: faker.helpers.arrayElement(JobExecutionTable.status.enumValues),
    startedAt,
    completedAt,
    responseTime,
    duration,
    statusCode: faker.helpers.arrayElement([200, 201, 204, 400, 401, 403, 404, 500]),
    responseBody: faker.helpers.maybe(() => JSON.stringify({ message: faker.lorem.sentence() })),
    errorMessage: faker.helpers.maybe(() => faker.lorem.sentence()),
    retryCount: faker.helpers.maybe(() => faker.number.int({ min: 0, max: 3 }), { probability: 0.3 }),
    isRetry: faker.datatype.boolean(),
  };
};

// Generate multiple users and cronjobs
export const users = Array.from({ length: 10 }, generateUser);
export const cronjobs = Array.from({ length: 40 }, generateCronjob);

// Generate job executions for each cronjob
export const jobExecutions = cronjobs.flatMap(cronjob => 
  Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => generateJobExecution(cronjob.id))
);

// Common password for all users
export const DEFAULT_PASSWORD = 'password1A@';
