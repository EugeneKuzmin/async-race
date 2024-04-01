import ElementCreator from '../../util/element-creator';
import './style.css';

type attr = { type?: string; style: string };
type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  elementAttributes: attr;
  callback: () => void;
};

class RoadNCar {
  private roadContainer: HTMLElement | null;
  private car: HTMLElement | null;
  private carColor: string;
  private road: HTMLElement | null;

  constructor() {
    this.car = null;
    this.roadContainer = null;
    this.road = null;
    this.carColor = '#ffff00';
    this.createRoadContainer();
    this.createRoad();
    this.createCar();
  }

  private createRoadContainer(): void {
    const roadContainerParams: Partial<ElementParams> = {
      tag: 'div',
      classNames: ['road-container'],
      textContent: ''
    };

    const roadContainerCreator = new ElementCreator(
      roadContainerParams as ElementParams
    );
    this.roadContainer = roadContainerCreator.getElement();
  }
  private createRoad(): void {
    const roadParams: Partial<ElementParams> = {
      tag: 'div',
      classNames: ['road'],
      textContent: ''
    };

    const roadCreator = new ElementCreator(roadParams as ElementParams);
    this.road = roadCreator.getElement();

    if (this.road && this.roadContainer) {
      this.roadContainer.appendChild(this.road);
    }
  }

  private createCar(): void {
    const carParams: Partial<ElementParams> = {
      tag: 'div',
      classNames: ['car'],
      textContent: '',
      elementAttributes: {
        style: `background-color: ${this.carColor}`
      }
    };

    const carCreator = new ElementCreator(carParams as ElementParams);
    const car = carCreator.getElement();

    if (car) {
      this.car = car;
      this.placeCarOnRoad();
    }
  }

  private placeCarOnRoad(): void {
    if (this.road && this.car) {
      this.road.appendChild(this.car);
    }
  }

  setCarColor(color: string): void {
    this.carColor = color;
    if (this.car) {
      this.car.style.backgroundColor = color;
    }
  }

  getElement(): HTMLElement | null {
    return this.roadContainer;
  }
}

export default RoadNCar;
