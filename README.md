# createElement

Polyfill built-in createElement to act like React.createElement

# Document.createElement

Normally just takes one parameter. The tag name. 

In [React](https://reactjs.org/docs/react-api.html#createelement) you might write:

```JavaScript
React.createElement('div', null, `Hello ${name}`);
```

## for example

Including this script 

```HTML
<script src=createElement.js></script>
```

and you can write something like:

```JavaScript
  const el = document.createElement('div', 
    {
      alpha: 12312122,
      beta: 'sdfasfd',
      gamma: {}
    },
    document.createElement('span', { style: 'font-variant: italic;' }, 'hi'),
    ' wow ',
    document.createElement('button', {onclick: () => alert(1)}, 'say')
  );
  onload = () => document.body.appendChild(el);
```
# content attributes, IDL attributes and event listeners

In the wild, the relationship between content attributes and IDL attributes depends on 
which attribute you are talking about, and when in the lifecycle of a node you are
interacting with it. 

As an approximation of the complexity, I've chosen to just turn any attribute
starting with 'on' into an IDL and set it directly on the node, instead of using setAttribute,
under the assumption that it's an event listener. Everything else uses setAttribute.

## the code

The code is pretty lightweight so I'll just include it here for references:

```JavaScript
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
```

## spec

Incidentally there has been discussion of implementing something like this in the [Web Spec](https://discourse.wicg.io/t/passing-an-object-of-attributes-to-document-createelement-as-the-second-argument/809)


