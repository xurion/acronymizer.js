/*jslint maxerr: 50, indent: 4 */
/*globals window, document*/

/**
 * Dean James' acronymizer.js.
 */

var Acronymizer;

(function () {
    'use strict';

    Acronymizer = function (settings) {

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
            if (!this.isElement(element)) {
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
                this.error('The attributes argument must be defined as an object');
            }

            var i;
            for (i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    this.setAttribute(i, attributes[i]);
                }
            }
        };

        this.hasClass = function (element, className) {
            if (!this.isElement(element)) {
                this.error('The element must be defined as an element');
            }
            if (typeof className !== 'string') {
                this.error('The className must be defined as a string');
            }
            return element.className.replace(/[\n\t]/g, " ").indexOf(className) > -1;
        };

        this.isElementSet = function () {
            return this.element !== undefined && this.isElement(this.element);
        };

        this.isPatternSet = function () {
            return typeof this.pattern == 'string' && this.pattern !== '';
        };

        this.isWrapperSet = function () {
            return typeof this.wrapper === 'string' && this.wrapper !== '';
        };

        this.addClassToElement = function (element, className) {
            if (!this.isElement(element)) {
                this.error('The element argument must be defined as an element');
            }
            if (typeof className !== 'string') {
                this.error('The className argument must be defined as a string');
            }
            if (element.className === '') {
                element.className = className;
            } else if (!this.hasClass(element, className)) {
                element.className += ' ' + className;
            }
        };

        this.addAttributesToElement = function (element, attributes) {
            if (!this.isElement(element)) {
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

        this.setEvent = function (name, func) {
            if (typeof name !== 'string') {
                this.error('The name argument must be defined as a string');
            }
            if (typeof func !== 'function') {
                this.error('The func argument must be defined as a function');
            }
            this.events[name] = func;
        };

        this.fireEvent = function (name, args) {
            if (typeof this.events[name] === 'function') {
                this.events[name].apply(this, args);
            }
        };

        /**
         * Wraps the given pat (pattern) in the given node with the given
         * nodeType.
         */
        this.innerHighlight = function (node, pattern, wrapperType, wrapperAttributes) {
            var skip = 0,
                pos,
                wrapper,
                middleBit,
                middleClone,
                i;

            if (this.isTextNode(node)) {
                pos = node.data.toUpperCase().indexOf(pattern);
                if (pos >= 0) {
                    if (!this.hasClass(node.parentNode, 'acronymized')) {
                        wrapper = document.createElement(wrapperType);
                        middleBit = node.splitText(pos);
                        middleBit.splitText(pattern.length);
                        middleClone = middleBit.cloneNode(true);
                        this.addAttributesToElement(wrapper, wrapperAttributes);
                        this.fireEvent('beforeWrap', [middleClone.data, wrapper]);
                        this.addClassToElement(wrapper, 'acronymized');
                        wrapper.appendChild(middleClone);
                        middleBit.parentNode.replaceChild(wrapper, middleBit);
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
            if (!this.isElementSet()) {
                this.error('An element has not been defined. Use the setElement() method to set an element');
            }
            if (!this.isPatternSet()) {
                this.error('A pattern has not been defined. Use the set pattern method to set a pattern');
            }
            if (!this.isWrapperSet()) {
                this.error('A wrapper has not been defined. Use the setWrapper method to set a wrapper');
            }
            this.innerHighlight(this.element, this.pattern.toUpperCase(), this.wrapper, this.attributes);
        };

        this.init = function (settings) {
            settings = settings || {};

            if (typeof settings !== 'object') {
                this.error('Settings must be defined as an object');
            }

            //set defaults
            this.attributes = {};
            this.events = {};

            //set the element if defined
            if (settings.element !== undefined) {
                this.setElement(settings.element);
            }
            //set the pattern
            if (settings.pattern !== undefined) {
                this.setPattern(settings.pattern);
            }
            //set the wrapper if defined, if not set it to default "acron"
            if (settings.wrapper !== undefined) {
                this.setWrapper(settings.wrapper);
            } else {
                this.setWrapper('acron');
            }
            //set the attributes if defined, if not, set to default {}
            if (settings.attributes !== undefined) {
                this.setAttributes(settings.attributes);
            }
        };

        this.init(settings);
    };

}());