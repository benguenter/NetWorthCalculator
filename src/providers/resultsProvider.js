import { inject } from 'aurelia-framework';
import { LoanCalculator } from '../calculators';
import { Api } from './api';

@inject(Api)
export class ResultsProvider {
  constructor(api) {
    this.investments = api.investments;
    this.results = api.results;
  }

  investmentUpdated = () => {
    while (this.results.length !== 0) {
      this.results.pop();
    }
    this.investments.forEach(investment => {
      if (investment.type === 'Loan') {
        this.results.push(LoanCalculator.run(investment));
      }
    });
  }
}
