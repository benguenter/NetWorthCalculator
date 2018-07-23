export class Investments {
  activate(model) {
    this.investments = model.investments;
    this.addNew = model.addNew;
    this.investmentUpdated = model.investmentUpdated;
  }

  attached() {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
  }
}
