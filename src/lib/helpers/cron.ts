export const updateCronExpression = (
  freq: string,
  { selectedDayOfWeek, selectedDayOfMonth }: { selectedDayOfWeek: number; selectedDayOfMonth: number },
) => {
  let cronExpression = '';

  switch (freq) {
    case 'minutely':
      cronExpression = '* * * * *';
      break;
    case 'hourly':
      cronExpression = `0 * * * *`;
      break;
    case 'daily':
      cronExpression = `0 0 * * *`;
      break;
    case 'weekly':
      cronExpression = `0 0 * * ${selectedDayOfWeek}`;
      break;
    case 'monthly':
      cronExpression = `0 0 ${selectedDayOfMonth} * *`;
      break;
    default:
      cronExpression = '0 * * * *';
  }

  return cronExpression;
};
