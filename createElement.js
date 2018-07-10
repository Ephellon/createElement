"use strict";
{
  const nativeCreate = document.createElement.bind(document);
  document.createElement = createElement;

  function createElement(name, attributes, ...children) {
    const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;
    delete attributes.is;
    const element = nativeCreate(name, nativeOptions);
    Object.entries(attributes).forEach(([name,value]) => element.setAttribute(name,value));
    children
      .filter( child => !(child == null || child == undefined))
      .forEach( child => element.appendChild( 
        child instanceof Node ? child : document.createTextNode(child)
      );
    return element;
  }
}
