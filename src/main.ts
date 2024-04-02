// import '../style.css';
import PageViewButtons from './classes/view/header/buttons-header';
import Main from './classes/view/main/main';

export default class App {

  private main:Main;
  constructor() {
    this.main = new Main()
    this.createView();
  }

  createView() {
    const headerBtns = new PageViewButtons();
    const headerElement: HTMLElement | null = headerBtns.getHeader();

    const mainElement: HTMLElement | null = this.main.getMain();

    if (headerElement) {
      document.body.appendChild(headerElement);
    }
    if (mainElement) {
      document.body.appendChild(mainElement);
    }
  }

  getMain(): HTMLElement | null {
    if (this.main) {
        return this.main;
    }
}
}
