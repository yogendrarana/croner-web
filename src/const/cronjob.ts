export const CronJobStatus = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  PAUSED: 'paused',
} as const;

export const CronJobLastRunStatus = {
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;
