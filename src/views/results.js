import { inject } from 'aurelia-framework';
import { ResultsProvider } from '../providers';

@inject(ResultsProvider)
export class ResultsCustomElement {
  constructor(resultsProvider) {
    this.results = resultsProvider.results;
  }

  attached() {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
  }
}
