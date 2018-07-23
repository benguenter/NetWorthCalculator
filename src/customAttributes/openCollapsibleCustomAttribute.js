export class openCollapsibleCustomAttribute {
  static inject = [Element];

  constructor(element) {
    this.element = element;
  }

  attached() {
    let collapsible = M.Collapsible.getInstance(this.element.parentNode);
    collapsible.open(this.element.parentNode.children.length - 1);
  }
}
