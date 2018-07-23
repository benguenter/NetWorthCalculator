import { DateTime } from 'luxon';

export class DateCalculator {
  static addBy = (date, frequency) => {
    let result;
    if (frequency === 'Monthly') {
      result = date.plus({ months: 1 });
    } else if (frequency === 'Semi-Monthly' && date.day === 1) {
      result = date.plus({ days: 14 });
    } else if (frequency === 'Semi-Monthly' && date.day === 15) {
      result = date.plus({ months: 1 }).startOf('month');
    } else if (frequency === 'Bi-Weekly') {
      result = date.plus({ weeks: 2 });
    } else if (frequency === 'Weekly') {
      result = date.plus({ weeks: 1 });
    }
    return result;
  }

  static beginningOfNextMonth = () => {
    return DateTime.utc().plus({months: 1}).startOf('month');
  }
}
