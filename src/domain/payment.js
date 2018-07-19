import { CurrencyFormatter } from '../utils/currencyFormatter';

export class Payment {
  constructor(date, startingBalance, value, interestPaid, endingBalance) {
    this.date = date;
    this.startingBalance = startingBalance;
    this.value = value;
    this.interestPaid = interestPaid;
    this.endingBalance = endingBalance;
  }

  formatter = CurrencyFormatter;
}
