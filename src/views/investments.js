import { inject } from 'aurelia-framework';
import { InvestmentProvider } from '../providers';

@inject(InvestmentProvider)
export class InvestmentsCustomElement {
  constructor(investmentProvider) {
    this.investmentProvider = investmentProvider;
  }
  attached() {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
  }
}
