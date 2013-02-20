/*jslint maxerr: 50, indent: 4 */
/*globals window, document*/

/**
 * Dean James' acronymizer.js.
 */

var Acronymizer;

(function () {
    'use strict';

    Acronymizer = function () {

        //set up the defaults
        this.attributes = {};
        this.wrapper = 'acron';

        this.error = function (errorMessage) {
            errorMessage = errorMessage || 'Unknown error';
            throw new Error('Acronymize: ' + errorMessage);
        };

        this.isElement = function (element) {
            if (element === undefined) {
                return false;
            }
            return Object.prototype.hasOwnProperty.call(element, 'nodeName');
        };

        this.isTextNode = function (node) {
            return (node !== undefined && this.isElement(node) && node.nodeType === 3);
        };

        this.setElement = function (element) {
            if (this.isElement(element) === false) {
                this.error('The element must be defined as an element');
            }
            this.element = element;
        };

        this.setPattern = function (pattern) {
            if (typeof pattern !== 'string') {
                this.error('Pattern must be defined as a string');
            }
            this.pattern = pattern;
        };

        this.setWrapper = function (wrapper) {
            if (typeof wrapper !== 'string') {
                this.error('The wrapper argument must be defined as a string');
            }
            if (wrapper === '') {
                this.error('The wrapper argument cannot be an empty string');
            }
            this.wrapper = wrapper;
        };

        this.setAttribute = function (key, value) {
            if (key === '' || key === undefined) {
                this.error('The key must be defined as a string');
            }
            if (value === undefined) {
                this.error('The value must be defined');
            }
            this.attributes[key] = value;
        };

        this.setAttributes = function (attributes) {
            if (typeof attributes !== 'object') {
                this.error('The attributes arguments must be defined as an object');
            }
            var i;
            for (i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    this.setAttribute(i, attributes[i]);
                }
            }
        };

        this.hasClass = function (element, className) {
            if (this.isElement(element) === false) {
                this.error('The element must be defined as an element');
            }
            if (typeof className !== 'string') {
                this.error('The className must be defined as a string');
            }
            return element.className.replace(/[\n\t]/g, " ").indexOf(className) > -1;
        };

        this.allOptionsSet = function () {
            return (this.isElement(this.element) === true && typeof this.pattern === 'string' && typeof this.wrapper === 'string');
        };

        this.addClassToElement = function (element, className) {
            if (this.isElement(element) === false) {
                this.error('The element argument must be defined as an element');
            }
            if (typeof className !== 'string') {
                this.error('The className argument must be defined as a string');
            }
            if (element.className === '') {
                element.className = className;
            } else if (this.hasClass(element, className) === false) {
                element.className += ' ' + className;
            }
        };

        this.addAttributesToElement = function (element, attributes) {
            if (this.isElement(element) === false) {
                this.error('The element argument must be defined as an element');
            }
            if (typeof attributes !== 'object') {
                this.error('The attributes argument must be defined as an object');
            }
            if (typeof attributes.className === 'string') {
                this.addClassToElement(element, attributes.className);
                delete attributes.className;
            }
            var i;
            for (i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    element[i] = attributes[i];
                }
            }
            return element;
        };

        /**
         * Wraps the given pat (pattern) in the given node with the given
         * nodeType.
         */
        this.innerHighlight = function (node, pattern, wrapperType, wrapperAttributes) {
            var skip = 0,
                pos,
                wrapper,
                middlebit,
                middleclone,
                i;

            if (this.isTextNode(node)) {
                pos = node.data.toUpperCase().indexOf(pattern);
                if (pos >= 0) {
                    if (this.hasClass(node.parentNode, 'acronymized') === false) {
                        wrapper = document.createElement(wrapperType);
                        middlebit = node.splitText(pos);
                        middlebit.splitText(pattern.length);
                        middleclone = middlebit.cloneNode(true);

                        wrapper.className = 'acronymized';
                        this.addAttributesToElement(wrapper, wrapperAttributes);
                        wrapper.appendChild(middleclone);
                        middlebit.parentNode.replaceChild(wrapper, middlebit);
                    }
                    skip = 1;
                }
            } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (i = 0; i < node.childNodes.length; i = i + 1) {
                    i += this.innerHighlight(node.childNodes[i], pattern, wrapperType, wrapperAttributes);
                }
            }
            return skip;
        };

        this.go = function () {
            if (this.allOptionsSet() === false) {
                this.error('All options have not been defined correctly');
            }
            this.innerHighlight(this.element, this.pattern.toUpperCase(), this.wrapper, this.attributes);
        };
    };

}());