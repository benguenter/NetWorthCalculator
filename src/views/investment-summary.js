import { inject, BindingEngine } from 'aurelia-framework';
import { Api } from '../providers/api';

@inject(Api, BindingEngine)
export class InvestmentSummaryCustomElement {
  results;
  constructor(api, bindingEngine) {
    this.results = api.results;
    bindingEngine.collectionObserver(this.results)
      .subscribe(this.updated);
  }

  updated = () => {
    if (this.chart) {
      this.chart.load({columns: this.regenerateData()});
      this.chart.groups(this.regenerateGroups());
    }
  }

  regenerateGroups = () => {
    return [this.results.map((investment) => investment.title)];
  }

  regenerateData = () => {
    const x = ['x'].concat(this.results[0].years.map((paymentYear) => paymentYear.year));
    const columns = [x];
    this.results.forEach(investment => {
      let title = investment.title;
      columns.push([title]
        .concat(investment.years.map(
          (year) => year.summary(investment.type).EndingBalance)));
    });
    return columns;
  }

  attached() {
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        type: 'area-spline',
        columns: this.regenerateData(),
        groups: this.regenerateGroups()
      },
      axis: {
        y: {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
}
