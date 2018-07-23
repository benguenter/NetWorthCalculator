export class Result {
  activate(model) {
    this.title = model.title;
    this.years = model.years;
  }

  attached() {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
  }
}
