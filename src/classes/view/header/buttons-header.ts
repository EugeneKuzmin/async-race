import Button from '../../util/button/button.ts';
import ElementCreator from '../../util/element-creator.ts';
import InputText from '../../util/input-text/input-text.ts';
import InputColor from '../../util/input-color/input-color.ts';
import Main from '../main/main.ts';
import RoadNCar from '../car/car.ts';
import App from '../../../main.ts';

type attr = { type: string };
type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  elementAttributes: attr;
  callback: () => void;
};

class PageViewButtons {
  private header: HTMLElement | null;
  private garage: Button;
  private winner: Button;
  private createCar: Button;

  private inputText: InputText;
  private inputColor: InputText;

  private roadNCar: RoadNCar;

  private main: Main;

  constructor() {
    this.header = null;
    this.garage = new Button('Garage', this.garageGetCars.bind(this));
    this.winner = new Button('Winners', this.getWinners.bind(this));
    this.createCar = new Button('Create', this.postColor.bind(this));
    this.roadNCar = new RoadNCar();
    this.main = new Main();

    const inputTextParams: Partial<ElementParams> = {
      tag: 'input',
      classNames: ['text-input'],
      textContent: ''
    };

    this.inputText = new InputText(inputTextParams as ElementParams);

    const inputColorParams: Partial<ElementParams> = {
      tag: 'input',
      classNames: ['color-input'],
      textContent: '',
      elementAttributes: { type: 'color' }
    };

    this.inputColor = new InputColor(inputColorParams as ElementParams);
    this.createHeader();
  }

  private createHeader(): void {
    const headerParams: Partial<ElementParams> = {
      tag: 'div',
      classNames: ['header'],
      textContent: ''
    };

    const headerCreator = new ElementCreator(headerParams as ElementParams);
    this.header = headerCreator.getElement();

    const garageButton = this.garage.getButton();
    const winnerButton = this.winner.getButton();
    const textInput = this.inputText.getElement();
    const colorInput = this.inputColor.getElement();
    const createCarButton = this.createCar.getButton();

    if (
      garageButton &&
      winnerButton &&
      textInput &&
      colorInput &&
      createCarButton
    ) {
      headerCreator.addInnerElement(garageButton);
      headerCreator.addInnerElement(winnerButton);
      headerCreator.addInnerElement(textInput);
      headerCreator.addInnerElement(colorInput);
      headerCreator.addInnerElement(createCarButton);
    }
  }

  getHeader(): HTMLElement | null {
    return this.header;
  }

  getButton1(): Button {
    return this.garage;
  }

  getButton2(): Button {
    return this.winner;
  }

  private renderCar(): void {
    const roadNCarEl = new RoadNCar().getElement();

    if (roadNCarEl) {
      const main = document.querySelector('.main-tracks');
      this.main.clearMain();
      main?.appendChild(roadNCarEl);
    }
  }

  private async garageGetCars(): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:3000/garage');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
    } catch (error) {}
  }
  private async getWinners(): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:3000/winners');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  private postColor(): void {
    const colorInputElement = this.inputColor.getElement() as HTMLInputElement;
    const textInputElement = this.inputText.getElement() as HTMLInputElement;
    if (colorInputElement && textInputElement) {
      const color = colorInputElement.value;
      const name = textInputElement.value;

      fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, color })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to post color');
          }
          this.renderCar();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}

export default PageViewButtons;
