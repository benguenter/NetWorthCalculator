export class InterestCalculator {
  static calcByFrequency = (rate, principle, frequency) => {
    let divisor = 1;
    if (frequency === 'Monthly') {
      divisor = 12;
    } else if (frequency === 'Semi-Monthly') {
      divisor = 24;
    } else if (frequency === 'Bi-Weekly') {
      divisor = 26;
    } else if (frequency === 'Weekly') {
      divisor = 52;
    }
    return principle * (parseFloat(rate) / 100 / divisor);
  }
}
