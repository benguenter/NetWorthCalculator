import { Payment, PaymentYear } from '../domain';
import { InterestCalculator, DateCalculator } from '.';

export class LoanCalculator {
  static run = (investment) => {
    let years = [];
    let runningDate = DateCalculator.beginningOfNextMonth();
    let runningTotal = parseFloat(investment.startingBalance);
    let payments = [];
    let runningYear = runningDate.year;
    while (years.length < 30 && runningTotal > 0) {
      if (runningYear !== runningDate.year) {
        years.push(new PaymentYear(payments, runningYear));
        payments = [];
        runningYear = runningDate.year;
      }

      let interestPaid = InterestCalculator.calcByFrequency(parseFloat(investment.interestRate), runningTotal, investment.incrementFrequency);
      let temporaryEndingBalance = runningTotal + interestPaid - parseFloat(investment.increment);
      let payment = new Payment(
        runningDate,
        runningTotal,
        investment.increment,
        interestPaid,
        temporaryEndingBalance
      );
      if (temporaryEndingBalance < 0) {
        payment.value = parseFloat(investment.increment) + temporaryEndingBalance;
        payment.endingBalance = 0;
      }
      payments.push(payment);
      runningTotal = temporaryEndingBalance;
      runningDate = DateCalculator.addBy(runningDate, investment.incrementFrequency);
    }
    years.push(new PaymentYear(payments, runningYear));
    return { title: investment.title, years };
  }
}
