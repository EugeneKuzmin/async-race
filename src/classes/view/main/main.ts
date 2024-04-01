import RoadNCar from '../car/car.ts';
import ElementCreator from '../../util/element-creator';

type attr = { type: string };
type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  elementAttributes: attr;
  callback: () => void;
};

class main {
  private main: HTMLElement | null;
  private roadNCar: RoadNCar;

  constructor() {
    this.main = null;
    this.roadNCar = new RoadNCar();
    this.createMain();
  }

  private createMain(): void {
    const mainParams: Partial<ElementParams> = {
      tag: 'div',
      classNames: ['main-tracks'],
      textContent: ''
    };

    const mainCreator = new ElementCreator(mainParams as ElementParams);
    this.main = mainCreator.getElement();

    const roadNCarEl = this.roadNCar.getElement();

    if (roadNCarEl) {
      mainCreator.addInnerElement(roadNCarEl);
    }
  }
  getMain(): HTMLElement | null {
    return this.main;
  }
}

export default main;
