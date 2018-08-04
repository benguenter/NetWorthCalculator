import { inject } from 'aurelia-framework';
import { ResultsProvider } from './resultsProvider';
import { Investment } from '../domain';
import { Api } from './api';

@inject(Api, ResultsProvider)
export class InvestmentProvider {
  constructor(api, resultsProvider) {
    this.investments = api.investments;
    this.resultsProvider = resultsProvider;
  }

  addNew = () => {
    this.investments.push(new Investment(this.resultsProvider.investmentUpdated, 'Loan', '', null, null, null, 'Monthly'));
  }
}
