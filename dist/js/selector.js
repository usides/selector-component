import { createDOMElement } from "./utils.js";

export class Selector {
  static #instances = [];
  static #instanceNumber = 0;
  static closeAllListBoxes = () =>
    this.#instances.forEach((instance) => instance.selector.#closeListBox());
  #id;
  #targetDOMElement;
  #selectorListBox;
  #selectorBodyText;
  #selectorBodyArrow;
  #options = [];
  #isOpen = false;
  #name;
  #value;

  constructor(options) {
    if (
      options === undefined ||
      !Array.isArray(options) ||
      options.length === 0
    )
      throw new Error("Provide an array with options for Selector");
    this.#options = options;
    Selector.#instanceNumber++;
    Selector.#instances.push({
      id: Selector.#instanceNumber,
      selector: this,
    });
    this.#id = Selector.#instanceNumber;
    this.#name = `selector-${Selector.#instanceNumber}`;
  }

  #createOptionElements() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.#options.length; i++) {
      const newOption = createDOMElement({
        element: "li",
        classes: "selector-list-box__option",
        html: this.#options[i],
        attributes: [{ key: "data-value", value: this.#options[i] }],
      });
      fragment.appendChild(newOption);
    }
    return fragment;
  }

  #toggleListBox() {
    this.#isOpen = this.#isOpen ? false : true;
    const otherInstances = Selector.#instances.filter(
      (instance) => instance.id !== this.#id
    );
    if (otherInstances.some((instance) => instance.selector.#isOpen)) {
      otherInstances.forEach((instance) => instance.selector.#closeListBox());
    }
    this.#selectorListBox.classList.toggle("hidden");
    this.#selectorBodyArrow.classList.toggle("selector-body__arrow_rotated");
  }

  #closeListBox() {
    this.#selectorListBox.classList.add("hidden");
    this.#isOpen = false;
    this.#selectorBodyArrow.classList.remove("selector-body__arrow_rotated");
  }

  #selectOption(e) {
    const target = e.target.closest("li");
    const value = target.dataset.value;
    this.#value = value;
    this.#render();
    this.#closeListBox();
  }

  #render() {
    this.#selectorBodyText.innerHTML = this.#value;
  }

  init(DOMElement) {
    if (DOMElement === undefined || !(DOMElement instanceof Element))
      throw new Error(
        "Provide a DOM Element for Selector component mounting as init argument"
      );
    if (this.#targetDOMElement)
      throw new Error("This Selector component was already initialized");

    this.#targetDOMElement = DOMElement;

    const selectorContainer = createDOMElement({
      element: "div",
      classes: "selector-container",
      parent: this.#targetDOMElement,
      attributes: [{ key: "data-name", value: this.#name }],
    });

    this.#selectorBodyText = createDOMElement({
      element: "div",
      classes: "selector-body__text",
      html: "Please select something",
    });

    this.#selectorBodyArrow = createDOMElement({
      element: "div",
      classes: "selector-body__arrow",
    });

    const selectorBody = createDOMElement({
      element: "div",
      classes: "selector-body",
      parent: selectorContainer,
      children: [this.#selectorBodyText, this.#selectorBodyArrow],
      listeners: [{ type: "click", func: () => this.#toggleListBox() }],
    });

    this.#selectorListBox = createDOMElement({
      element: "ul",
      classes: "selector-list-box hidden",
      children: [this.#createOptionElements()],
      parent: selectorContainer,
      listeners: [{ type: "click", func: (e) => this.#selectOption(e) }],
    });
    this.#selectorListBox.style.width = `${selectorBody.offsetWidth}px`;
  }

  get value() {
    return {
      name: this.#name,
      value: this.#value,
    };
  }
}
