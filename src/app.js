import { InvestmentProvider } from './providers';
import { inject } from 'aurelia-framework';

@inject(InvestmentProvider)
export class App {
  constructor(investmentProvider) {
    investmentProvider.addNew();
  }
}
