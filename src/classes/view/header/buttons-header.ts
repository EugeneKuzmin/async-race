import Button from '../../util/button/button.ts';
import ElementCreator from '../../util/element-creator.ts';
type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  callback: () => void;
};

class PageViewButtons {
  private header: HTMLElement | null;
  private garage: Button;
  private winner: Button;

  constructor(garageLabel: string, winnersLabel: string) {
    this.header = null;
    this.garage = new Button(garageLabel, this.garageGetCars.bind(this));
    this.winner = new Button(winnersLabel, this.getWinners.bind(this));
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

    if (garageButton && winnerButton) {
      headerCreator.addInnerElement(garageButton);
      headerCreator.addInnerElement(winnerButton);
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

  private async garageGetCars(): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:3000/garage');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Response from server:', data);
      // Handle response data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  private async getWinners(): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:3000/winners');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Response from server:', data);
      // Handle response data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default PageViewButtons;
