import { DateTime } from 'luxon';

export const checkForPayment = (lastPayment: Date) => {
  const endDate = DateTime.now();
  const startDate = lastPayment
    ? DateTime.fromISO(lastPayment.toISOString())
    : null;

  if (!startDate) return { due: true, months: null };

  const months = startDate
    ? Math.floor(endDate.diff(startDate, 'months').values.months)
    : 0;

  if (months == 0) {
    return { due: false, months: 0 };
  } else {
    return { due: true, months: 1 };
  }
};
