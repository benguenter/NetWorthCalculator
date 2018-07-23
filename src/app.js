import { Investment } from './domain/investment';
import { LoanCalculator } from './calculators';

export class App {
  constructor() {
    this.investments = [];
    this.results = [];
  }

  attached() {
    this.addNew();
  }

  addNew = () => {
    this.investments.push(new Investment(this.investmentUpdated, 'Loan', '', null, null, null, 'Monthly'));
  }

  investmentUpdated = () => {
    this.results = [];
    this.investments.forEach(investment => {
      if (investment.type === 'Loan') {
        this.results.push(LoanCalculator.run(investment));
      }
    });
  }
}
