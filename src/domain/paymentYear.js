import { FormatCurrency } from '../utils';

export class PaymentYear {
  constructor(payments, year) {
    this.startingBalance = payments[0].startingBalance;
    this.totalPayments = payments.reduce((total, current) => total + parseFloat(current.value), 0);
    this.totalInterestPaid = payments.reduce((total, current) => total + parseFloat(current.interestPaid), 0);
    this.endingBalance = payments[payments.length - 1].endingBalance;
    this.payments = payments;
    this.year = year;
  }

  formatCurrency = FormatCurrency;

  summary = (type) => {
    if (type === 'Loan') {
      return {
        EndingBalance: Math.round(this.endingBalance * -1)
      };
    }
    return {
      EndingBalance: Math.round(this.endingBalance)
    }
  }
}
