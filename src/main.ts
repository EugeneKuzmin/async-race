// import '../style.css';
import PageViewButtons from './classes/view/header/buttons-header';
import Main from './classes/view/main/main';

export default class App {
  constructor() {
    this.createView();
  }

  createView() {
    const headerBtns = new PageViewButtons();
    const headerElement: HTMLElement | null = headerBtns.getHeader();

    const main = new Main();
    const mainElement: HTMLElement | null = main.getMain();

    if (headerElement) {
      document.body.appendChild(headerElement);
    }
    if (mainElement) {
      document.body.appendChild(mainElement);
    }
  }
}
