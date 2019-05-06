# createElement

Polyfill built-in createElement to act like an O.P. React.createElement

## Document.createElement

Normally just takes one parameter, the tag name.

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
  let el = document.createElement('div#id', 
    {
      alpha: 12312122,
      beta: 'sdfasfd',
      gamma: {}
    },
    document.createElement('span.class', { style: 'font-variant: italic;' }, 'hi'),
    ' wow ',
    document.createElement('button[onhover=console.log("hovering...")]', { onclick: () => alert(1) }, 'say')
  );
  onload = () => document.body.appendChild(el);
```

## content attributes, IDL attributes and event listeners

In the wild, the relationship between content attributes and IDL attributes depends on 
which attribute you are talking about, and when in the lifecycle of a node you are
interacting with it. 

As an approximation of the complexity, I've chosen to just turn any attribute
starting with 'on' into an IDL and set it directly on the node, instead of using setAttribute,
under the assumption that it's an event listener, and not an intrisic value (innerHTML, outerHTML, textContent, class, value, etc.). Everything else uses setAttribute.

## spec

Incidentally there has been discussion of implementing something like this in the [Web Spec](https://discourse.wicg.io/t/passing-an-object-of-attributes-to-document-createelement-as-the-second-argument/809)

