import { Investment } from './domain/investment';

export class App {
  constructor() {
    this.investments = [ new Investment('Loan') ];
  }

  attached() {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }

  addLoan() {
    this.investments.push(new Investment('Loan'));
  }
}
