import { observable, transient } from 'aurelia-framework';

@observable({ name: 'type', changeHandler: 'updated' })
@observable({ name: 'startingBalance', changeHandler: 'updated' })
@observable({ name: 'interestRate', changeHandler: 'updated' })
@observable({ name: 'increment', changeHandler: 'updated' })
@observable({ name: 'incrementFrequency', changeHandler: 'updated' })
@transient()
export class Investment {
  type;
  startingBalance;
  interestRate;
  increment;
  incrementFrequency;

  constructor(investmentUpdated, type, title, startingBalance, interestRate, increment, incrementFrequency) {
    this.years = [];
    this.investmentUpdated = investmentUpdated;
    this.title = title;
    this.type = type;
    this.startingBalance = startingBalance;
    this.interestRate = interestRate;
    this.increment = increment;
    this.incrementFrequency = incrementFrequency;
  }

  updated() {
    if (!this.startingBalance || !this.interestRate || !this.increment) {
      return;
    }
    this.investmentUpdated();
  }

  attached() {
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }
}
