type attr = { type?: string; style?: string };
type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  elementAttributes: attr;
  callback: () => void;
};
export default class ElementCreator {
  private element: HTMLElement | null;
  constructor(params: ElementParams) {
    this.element = null;
    this.createElement(params);
  }

  getElement(): HTMLElement | null {
    return this.element;
  }

  clearElement(): void {
    if (this.element) {
      console.log('cleared');
      this.element.innerHTML = '';
    }
  }

  addInnerElement(element: HTMLElement | ElementCreator): void {
    if (element instanceof ElementCreator) {
      this.element?.append(element.getElement()!);
    } else {
      this.element?.append(element);
    }
  }

  createElement(params: ElementParams): void {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.classNames);
    this.setTextContent(params.textContent);
    this.setCallback(params.callback);
    this.setType(params.elementAttributes);
  }

  setCssClasses(cssClasses: string[] = []) {
    cssClasses.map((cssClass) => this.element?.classList.add(cssClass));
  }

  setTextContent(text: string = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  setType(type: attr): void {
    if (type) {
      if (this.element) {
        if (type.type) {
          this.element.setAttribute('type', type.type);
        }
        if (type.style) {
          this.element.setAttribute('style', type.style);
        }
      }
    }
  }

  setCallback(callback: (event: Event) => void): void {
    if (callback) {
      this.element?.addEventListener('click', callback);
    }
  }
}
