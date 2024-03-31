type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
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
  }

  setCssClasses(cssClasses: string[] = []) {
    cssClasses.map((cssClass) => this.element?.classList.add(cssClass));
  }

  setTextContent(text: string = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  setCallback(callback: (event: Event) => void): void {
    if (callback) {
      this.element?.addEventListener('click', callback);
    }
  }
}
