export const cronjobExamples = [
  { label: 'Every minute', expression: '* * * * *', description: 'Runs every minute' },
  { label: 'Every hour', expression: '0 * * * *', description: 'Runs at minute 0 of every hour' },
  { label: 'Every 15 minutes', expression: '*/15 * * * *', description: 'Runs every 15 minutes' },
  { label: 'Daily at midnight', expression: '0 0 * * *', description: 'Runs once a day at 00:00' },
  { label: 'Weekdays at 9 AM', expression: '0 9 * * 1-5', description: 'Runs at 9:00 AM Monday through Friday' },
];

export const cronjobDays = [
  { day: 'Sunday', value: 0 },
  { day: 'Monday', value: 1 },
  { day: 'Tuesday', value: 2 },
  { day: 'Wednesday', value: 3 },
  { day: 'Thursday', value: 4 },
  { day: 'Friday', value: 5 },
  { day: 'Saturday', value: 6 },
];
