import { DateTime } from 'luxon';
import { Payment, PaymentYear } from '.';
import { observable } from 'aurelia-framework';

@observable({ name: 'type', changeHandler: 'runCalculation' })
@observable({ name: 'startingBalance', changeHandler: 'runCalculation' })
@observable({ name: 'interestRate', changeHandler: 'runCalculation' })
@observable({ name: 'increment', changeHandler: 'runCalculation' })
@observable({ name: 'incrementFrequency', changeHandler: 'runCalculation' })
export class Investment {
  type;
  ingBalance;
  interestRate;
  increment;
  incrementFrequency;

  constructor(type, title, startingBalance, interestRate, increment, incrementFrequency) {
    this.years = [];
    this.title = title;
    this.type = type;
    this.startingBalance = startingBalance;
    this.interestRate = interestRate;
    this.increment = increment;
    this.incrementFrequency = incrementFrequency;
  }

  runCalculation() {
    if (!this.startingBalance || !this.interestRate || !this.increment) {
      return;
    }
    this.years = [];
    if (this.type === 'Loan') {
      this.runForLoan();
    }
  }

  runForLoan() {
    let runningDate = DateTime.utc().plus({months: 1});
    let runningTotal = parseFloat(this.startingBalance);
    let payments = [];
    let runningYear = runningDate.year;
    while (this.years.length < 30 && runningTotal > 0) {
      if (runningYear !== runningDate.year) {
        this.addYear(payments, runningYear);
        payments = [];
        runningYear = runningDate.year;
      }

      let interestPaid = runningTotal * (parseFloat(this.interestRate) / 100 / 12);
      let temporaryEndingBalance = runningTotal + interestPaid - parseFloat(this.increment);
      let payment = new Payment(
        runningDate,
        runningTotal,
        this.increment,
        interestPaid,
        temporaryEndingBalance
      );
      if (temporaryEndingBalance < 0) {
        payment.value = parseFloat(this.increment) + temporaryEndingBalance;
        payment.endingBalance = 0;
      }
      payments.push(payment);
      runningTotal = temporaryEndingBalance;
      runningDate = runningDate.plus({months: 1});
    }
    this.addYear(payments, runningYear);
  }

  addYear(payments, year) {
    this.years.push(new PaymentYear(payments, year));
  }
}
