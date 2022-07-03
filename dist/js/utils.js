export const createDOMElement = ({
  element,
  classes,
  html,
  parent,
  children,
  attributes,
  listeners,
}) => {
  const newElement = document.createElement(element);
  if (classes) newElement.className = classes;
  if (html) newElement.innerHTML = html;
  if (children) {
    for (let child of children) {
      newElement.appendChild(child);
    }
  }
  if (parent) parent.appendChild(newElement);
  if (attributes) {
    for (let attribute of attributes) {
      newElement.setAttribute(attribute.key, attribute.value);
    }
  }
  if (listeners) {
    for (let listener of listeners) {
      newElement.addEventListener(listener.type, listener.func);
    }
  }
  return newElement;
};
