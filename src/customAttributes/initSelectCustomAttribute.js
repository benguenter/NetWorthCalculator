export class InitSelectCustomAttribute {
  attached() {
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }
}
