#acronymizer.js

Wraps text in HTML with an element (acron by default) whilst keeping any bound events intact.

## Link

http://github.com/xurion/acronymizer.js

## Examples

### Simple

    var div = document.getElementById('myDiv'),
        acron = new Arconymizer({
            element: div,
            pattern: 'CSS'
        });

    acron.go();

### Advanced

    var div = document.getElementById('myDiv'),
        acron = new Arconymizer();

    acron.setElement(div);
    acron.setPattern('PHP');
    acron.setWrapper('a');
    acron.setAttribute('href', 'php.html');
    acron.go();

## Install

To use acronymizer.js, simply add it to your markup:

    <script type="text/javascript" src="acronymizer.js"></script>

## History

acronymizer.js initially started it's life as an easy way to wrap text patterns in markup with acron elements. This allowed me to acronym abbreviations, like CSS and PHP and provide a tooltip as you hovered over it.

It has since been modified to be a JSLinted, tested class to allow the wrapping of any pattern with any element, along with any attributes.