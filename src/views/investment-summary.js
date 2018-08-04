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
      this.chart.load(this.regenerate());
    }
  }

  regenerate = () => {
    const types = {};
    const x = ['x'].concat(this.results[0].years.map((paymentYear) => paymentYear.year));
    const columns = this.results.map((val) => {
      types[val.title] = 'area-spline';
      return [val.title]
        .concat(val.years.map((year) => Math.round(year.endingBalance * -1)));
    });
    columns.push(x);
    return {
      x: 'x',
      types: types,
      columns: columns
    };
  }

  attached() {
    this.chart = c3.generate({
      bindto: '#chart',
      data: this.regenerate(),
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
