/** Adopted from <https://github.com/crislin2046/createElement>
* LICENSE: MIT (2018)
*/
"use strict";
{
    let nativeCreate = document.createElement.bind(document);

    document.createElement = function createElement(TAGNAME, ATTRIBUTES = {}, ...CHILDREN) {
        let u = v => v && v.length,
            R = RegExp,
            name = TAGNAME,
            attributes = ATTRIBUTES,
            children = CHILDREN;

        if( !u(name) )
            throw TypeError(`TAGNAME cannot be ${ (name === '')? 'empty': name }`);

        let options = attributes.is === true? { is: true }: null;

        delete attributes.is;

        name = name.split(/([#\.][^#\.\[\]]+)/).filter( u );

        if(name.length <= 1)
            name = name[0].split(/^([^\[\]]+)(\[.+\])/).filter( u );

        if(name.length > 1)
            for(let n = name, i = 1, l = n.length, t, v; i < l; i++)
                if((v = n[i].slice(1, n[i].length)) && (t = n[i][0]) == '#')
                    attributes.id = v;
                else if(t == '.')
                    attributes.classList = [].slice.call(attributes.classList || []).concat(v);
                else if(/\[(.+)\]/.test(n[i]))
                    R.$1.split('][').forEach(N => attributes[(N = N.split('=', 2))[0]] = N[1] || '');
        name = name[0];

        let element = document.createElement(name, options);

        if(attributes.classList instanceof Array)
            attributes.classList = attributes.classList.join(' ');

        Object.entries(attributes).forEach(
            ([name, value]) => (/^(on|(?:(?:inner|outer)(?:HTML|Text)|textContent|class(?:List|Name)|value)$)/.test(name))?
                element[name] = value:
            element.setAttribute(name, value)
        );

        children
            .filter( child => child !== undefined && child !== null )
            .forEach(
                child =>
                    child instanceof Element?
                        element.append(child):
                    child instanceof Node?
                        element.appendChild(child):
                    element.appendChild(
                        parent.createTextNode(child)
                    )
            );

        return element;
    };

    document.createElement[Symbol.toPrimitive] = () => 'function createElement() { [native code] }';
}
