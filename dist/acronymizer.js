/*globals document*/

/**
 * Dean James' acronymizer.js.
 *
 * @param {Object} settings The settings object. Has the following options:
 *  element - The element to acronymize.
 *  pattern - The regular expression text pattern.
 *  wrapper - Sets a custom wrapper type. Defaults to abbr.
 */
function Acronymizer(settings) {

    'use strict';

    settings = settings || {};

    if (typeof settings !== 'object') {
        this.error('Settings must be defined as an object');
    }

    //set defaults
    this.attributes = {};
    this.events = {};
    this.wrappers = [];
    this.caseSensitive = false;
    this.element = settings.element;
    this.wrapper = settings.wrapper || 'abbr';
    this.attributes = settings.attributes || {};

    if (settings.pattern !== undefined) {
        this.setPattern(settings.pattern);
    }

}

(function () {
    'use strict';

    Acronymizer.prototype = {

        error: function (errorMessage) {
            errorMessage = errorMessage || 'Unknown error';
            throw new Error(errorMessage);
        },

        isElement: function (element) {
            if (element === undefined) {
                return false;
            }
            return Object.prototype.hasOwnProperty.call(element, 'nodeName');
        },

        isTextNode: function (node) {
            return node !== undefined && this.isElement(node) && node.nodeType === 3;
        },

        isRegExp: function (regexp) {
            return regexp !== undefined && regexp instanceof RegExp;
        },

        setElement: function (element) {
            if (!this.isElement(element)) {
                this.error('The element must be defined as an element');
            }
            this.element = element;
        },

        setPattern: function (pattern) {
            if (pattern === undefined) {
                this.error('Pattern is undefined');
            }
            if (typeof pattern !== 'string' && !this.isRegExp(pattern)) {
                this.error('Pattern must be defined as a string or regular expression');
            }

            var modifiers = 'g' + (this.caseSensitive ? '' : 'i');

            if (this.isRegExp(pattern)) {
                pattern = new RegExp(pattern.source, modifiers);
            }
            if (typeof pattern === 'string') {
                pattern = new RegExp(pattern, modifiers);
            }
            this.pattern = pattern;
        },

        setIsCaseSensitive: function (bool) {
            if (typeof bool !== 'boolean') {
                this.error('The bool argument must be defined as a boolean');
            }
            this.caseSensitive = bool;
        },

        setWrapper: function (wrapper) {
            if (typeof wrapper !== 'string') {
                this.error('The wrapper argument must be defined as a string');
            }
            if (wrapper === '') {
                this.error('The wrapper argument cannot be an empty string');
            }
            this.wrapper = wrapper;
        },

        setAttribute: function (key, value) {
            if (key === '' || key === undefined) {
                this.error('The key must be defined as a string');
            }
            if (value === undefined) {
                this.error('The value must be defined');
            }
            this.attributes[key] = value;
        },

        setAttributes: function (attributes) {
            if (typeof attributes !== 'object') {
                this.error('The attributes argument must be defined as an object');
            }

            var i;

            for (i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    this.setAttribute(i, attributes[i]);
                }
            }
        },

        hasClass: function (element, className) {
            if (!this.isElement(element)) {
                this.error('The element must be defined as an element');
            }
            if (typeof className !== 'string') {
                this.error('The className must be defined as a string');
            }
            return element.className.replace(/[\n\t]/g, " ").indexOf(className) > -1;
        },

        isElementSet: function () {
            return this.element !== undefined && this.isElement(this.element);
        },

        isPatternSet: function () {
            return this.pattern !== undefined && this.isRegExp(this.pattern);
        },

        isWrapperSet: function () {
            return typeof this.wrapper === 'string' && this.wrapper !== '';
        },

        addClassToElement: function (element, className) {
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
        },

        addAttributesToElement: function (element, attributes) {
            if (!this.isElement(element)) {
                this.error('The element argument must be defined as an element');
            }
            if (typeof attributes !== 'object') {
                this.error('The attributes argument must be defined as an object');
            }

            var i;

            for (i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    if (i === 'className') {
                        this.addClassToElement(element, attributes.className);
                    } else {
                        element[i] = attributes[i];
                    }
                }
            }
            return element;
        },

        bind: function (name, func) {
            if (typeof name !== 'string') {
                this.error('The name argument must be defined as a string');
            }
            if (typeof func !== 'function') {
                this.error('The func argument must be defined as a function');
            }
            this.events[name] = func;
        },

        trigger: function (name, args) {
            if (typeof this.events[name] === 'function') {
                this.events[name].apply(this, args);
            }
        },

        getStringPositions: function (text, regexp) {
            if (typeof text !== 'string' || !this.isRegExp(regexp)) {
                return [];
            }

            var matches = [],
                match;

            if (regexp.global === false) {
                match = regexp.exec(text);
                matches.push(match.index);
            } else {
                while ((match = regexp.exec(text)) !== null) {
                    matches.push({
                        text: match[0],
                        length: match[0].length,
                        index: match.index
                    });
                }
            }

            return matches;
        },

        /**
         * Wraps the given pattern in the given node with the given nodeType.
         */
        innerHighlight: function (options) {
            var skip = 0,
                node = options.node,
                pattern = options.pattern,
                wrapperType = options.wrapper,
                wrapperAttributes = options.wrapperAttributes,
                matches,
                splitPosition,
                splitLength,
                wrapper,
                split1,
                remainingText,
                i,
                x;

            /* jshint maxdepth:false */
            if (this.isTextNode(node) && !this.hasClass(node.parentNode, 'acronymized')) {
                //pos = node.data.indexOf(pattern);
                matches = this.getStringPositions(node.data, pattern);
                if (matches.length > 0) {
                    splitPosition = matches[0].index;
                    splitLength = matches[0].length;
                    split1 = node.splitText(splitPosition); //slices away "This is " and leaves textNode as "some text that....."
                    remainingText = split1.splitText(splitLength); //leaves textNode as sets remainingText as " text that has the ......."
                    wrapper = document.createElement(wrapperType);
                    this.addAttributesToElement(wrapper, wrapperAttributes);
                    this.trigger('beforeWrap', [split1.data, wrapper]);
                    this.addClassToElement(wrapper, 'acronymized');
                    wrapper.innerHTML = matches[0].text;
                    split1.parentNode.replaceChild(wrapper, split1);
                    this.trigger('afterWrap', [split1.data, wrapper]);
                    this.wrappers.push(wrapper);
                    if (matches.length > 1) {
                        x = matches[0].index + matches[0].length; //sets the current point in which the replacement has taken place
                        for (i = 1; i < matches.length; i = i + 1) {
                            splitPosition = matches[i].index - x;
                            splitLength = matches[i].length;
                            split1 = remainingText.splitText(splitPosition); //slices away "This is " and leaves textNode as "some text that....."
                            remainingText = split1.splitText(splitLength); //leaves textNode as sets remainingText as " text that has the ......."
                            x = x + (matches[i].index + matches[i].length); //sets the current point in which the replacement has taken place
                            wrapper = document.createElement(wrapperType);
                            this.addAttributesToElement(wrapper, wrapperAttributes);
                            this.trigger('beforeWrap', [split1.data, wrapper]);
                            this.addClassToElement(wrapper, 'acronymized');
                            wrapper.innerHTML = matches[i].text;
                            split1.parentNode.replaceChild(wrapper, split1);
                            this.trigger('afterWrap', [split1.data, wrapper]);
                            this.wrappers.push(wrapper);
                        }
                    }
                    skip = 1;
                }
            } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (i = 0; i < node.childNodes.length; i = i + 1) {
                    i += this.innerHighlight({
                        node: node.childNodes[i],
                        pattern: pattern,
                        wrapper: wrapperType,
                        wrapperAttributes: wrapperAttributes
                    });
                }
            }
            /* jshint maxdepth:3 */
            return skip;
        },

        init: function () {
            if (!this.isElementSet()) {
                this.error('An element has not been defined. Use the setElement() method to set an element');
            }
            if (!this.isPatternSet()) {
                this.error('A pattern has not been defined. Use the set pattern method to set a pattern');
            }
            if (!this.isWrapperSet()) {
                this.error('A wrapper has not been defined. Use the setWrapper method to set a wrapper');
            }

            this.innerHighlight({
                node: this.element,
                pattern: this.pattern,
                wrapper: this.wrapper,
                wrapperAttributes: this.attributes
            });
            this.trigger('afterWrapAll', [this.wrappers]);
            this.wrappers = [];
        }

    };
}());
