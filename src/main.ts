// import '../style.css';
import PageViewButtons from './classes/view/header/buttons-header';

export default class App {
  constructor() {
    this.createView();
  }

  createView() {
    const headerBtns = new PageViewButtons('Garage', 'Winners');
    const headerElement: HTMLElement | null = headerBtns.getHeader();

    if (headerElement) {
      document.body.appendChild(headerElement);
    }
  }
}
