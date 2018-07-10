"use strict";
{
  const nativeCreate = document.createElement.bind(document);
  document.createElement = createElement;

  // just for the lulz
  document.createElement[Symbol.toPrimitive] = () => "function createElement() { [native code] }";

  function createElement(name, attributes, ...children) {
    attributes = attributes || {};
    const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;
    delete attributes.is;

    const element = nativeCreate(name, nativeOptions);

    // content attributes vs IDL attributes have many cases
    Object.entries(attributes).forEach(([name,value]) => name.startsWith('on') ? 
      element[name] = value : element.setAttribute(name,value)
    );

    children
      .filter( child => !(child == null || child == undefined))
      .forEach( child => element.appendChild( 
        child instanceof Node ? child : document.createTextNode(child)
      ));

    return element;
  }
}
