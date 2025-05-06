// pending, running, success, failed, canceled
export const CronjobStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELED: 'canceled',
} as const;

export type CronjobStatusType = (typeof CronjobStatus)[keyof typeof CronjobStatus];
