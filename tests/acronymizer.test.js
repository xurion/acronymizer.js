/*jshint es5:false*/
/*globals document, describe, it, beforeEach, afterEach, Acronymizer, expect*/

describe('Acronymizer', function () {

    'use strict';

    var acron;

    beforeEach(function () {
        acron = new Acronymizer();
    });
    afterEach(function () {
        acron = undefined;
    });

    it('should return an instance of itself when initialised', function () {
        expect(acron instanceof Acronymizer).toBe(true);
    });
    it('should have a default wrapper property set to "abbr"', function () {
        expect(acron.wrapper).toEqual('abbr');
    });
    it('should have a default attributes property as an empty object', function () {
        expect(acron.attributes).toEqual({});
    });
    it('should have a default events property set to an empty object', function () {
        expect(acron.events).toEqual({});
    });
    it('should have a default caseSensitive property set to false', function () {
        expect(acron.caseSensitive).toBe(false);
    });
    it('should accept a settings argument with an element value that sets the element property', function () {
        var a = document.createElement('a');

        acron = new Acronymizer({
            element: a
        });

        expect(acron.element).toEqual(a);
    });
    it('should accept a settings argument with a pattern property as a regular expression that sets the pattern property', function () {
        acron = new Acronymizer({
            pattern: /myPattern/gi
        });

        expect(acron.pattern).toEqual(/myPattern/gi);
    });
    it('should accept a settings argument with a pattern property as a string that sets the pattern property as a regular expression', function () {
        acron = new Acronymizer({
            pattern: 'myPattern'
        });

        expect(acron.pattern).toEqual(/myPattern/gi);
    });
    it('should accept a settings argument with a wrapper value that sets the wrapper property', function () {
        acron = new Acronymizer({
            wrapper: 'p'
        });

        expect(acron.wrapper).toEqual('p');
    });

    it('should accept a settings argument with an attributes value that sets the attributes property', function () {
        acron = new Acronymizer({
            attributes: {
                href: 'page.html'
            }
        });

        expect(acron.attributes).toEqual({
            href: 'page.html'
        });
    });

    it('should accept a settings argument that contains element, pattern, wrapper and attributes values and set them to the correct properties', function () {
        var span = document.createElement('span');

        span.innerHTML = 'This is my text';

        acron = new Acronymizer({
            element: span,
            pattern: 'my',
            wrapper: 'a',
            attributes: {
                href: 'mixed.html',
                title: 'Link'
            }
        });

        expect(acron.attributes).toEqual({
            href: 'mixed.html',
            title: 'Link'
        });
    });

    it('should throw an error if the settings argument is not defined as an object', function () {
        expect(function () {
            acron = new Acronymizer('string');
        }).toThrowError('Settings must be defined as an object');
        expect(function () {
            acron = new Acronymizer(44);
        }).toThrowError('Settings must be defined as an object');
    });

    describe('error()', function () {
        it('should throw an error with the given text', function () {
            expect(function () {
                acron.error('Test error');
            }).toThrowError('Test error');
        });
        it('should throw an "unknown error" when no error text is defined', function () {
            expect(function () {
                acron.error();
            }).toThrowError('Unknown error');
        });
    });

    describe('isElement()', function () {
        it('should accept an element as an argument and return true', function () {
            var a = document.createElement('a');
            expect(acron.isElement(a)).toBe(true);
        });
        it('should accept a non-element as an argument and return false', function () {
            expect(acron.isElement({})).toBe(false);
            expect(acron.isElement('string')).toBe(false);
        });
        it('should accept undefined as an argument and return false', function () {
            expect(acron.isElement()).toBe(false);
        });
    });

    describe('isTextNode()', function () {
        it('should accept a single node argument and return true if it is a text node', function () {
            var textNode = document.createTextNode('myNode');
            expect(acron.isTextNode(textNode)).toBe(true);
        });
        it('should return false if the node argument is not defined as a text node', function () {
            var a = document.createElement('a');
            expect(acron.isTextNode(a)).toBe(false);
            expect(acron.isTextNode('string')).toBe(false);
        });
    });

    describe('isRegExp()', function () {
        it('should return true if the regexp argument is a regular expression', function () {
            expect(acron.isRegExp(/my pattern/)).toBe(true);
        });
        it('should return false if the regexp argument is not a regular expression', function () {
            expect(acron.isRegExp('my pattern')).toBe(false);
        });
        it('should return false if the regexp argument is not defined', function () {
            expect(acron.isRegExp()).toBe(false);
        });
    });

    describe('setElement()', function () {
        it('should accept a single argument defined as an element and set it as the element property', function () {
            var a = document.createElement('a');
            acron.setElement(a);
            expect(a).toEqual(acron.element);
        });
        it('should throw an error if the argument is not defined as an element', function () {
            expect(function () {
                acron.setElement();
            }).toThrowError('The element must be defined as an element');
            expect(function () {
                acron.setElement('string');
            }).toThrowError('The element must be defined as an element');
            expect(function () {
                acron.setElement({});
            }).toThrowError('The element must be defined as an element');
        });
    });

    describe('setPattern()', function () {
        it('should accept a pattern argument defined as a string and set it as the pattern property as a global regular expression', function () {
            acron.setPattern('my pattern');
            expect(acron.pattern).toEqual(/my pattern/gi);
        });
        it('should accept a pattern argument defined as a global regular expression and set it as the pattern property as a global regular expression', function () {
            acron.setPattern(/my pattern/g);
            expect(acron.pattern).toEqual(/my pattern/gi);
        });
        it('should accept a pattern argument defined as a non-global case-insensitive regular expression and set it as the pattern property as a global case-insensitive regular expression', function () {
            acron.setPattern(/my pattern/);
            expect(acron.pattern).toEqual(/my pattern/gi);
        });
        it('should throw an error if the pattern argument is not defined as a string or regular expression', function () {
            expect(function () {
                acron.setPattern();
            }).toThrowError('Pattern is undefined');
            expect(function () {
                acron.setPattern({});
            }).toThrowError('Pattern must be defined as a string or regular expression');
        });
    });

    describe('setIsCaseSensitive()', function () {
        it('should accept a bool argument defined as a boolean and set the caseSensitive property', function () {
            acron.setIsCaseSensitive(true);
            expect(acron.caseSensitive).toBe(true);
            acron.setIsCaseSensitive(false);
            expect(acron.caseSensitive).toBe(false);
        });
        it('should throw an error if the bool argument is not defined as a boolean', function () {
            expect(function () {
                acron.setIsCaseSensitive('string');
            }).toThrowError('The bool argument must be defined as a boolean');
        });
    });

    describe('setWrapper()', function () {
        it('should accept a single argument defined as a string and set it as the wrapper property', function () {
            acron.setWrapper('a');
            expect(acron.wrapper).toEqual('a');
        });
        it('should throw an error if the argument is not defined as a string', function () {
            expect(function () {
                acron.setWrapper(22);
            }).toThrowError('The wrapper argument must be defined as a string');
            expect(function () {
                acron.setWrapper({});
            }).toThrowError('The wrapper argument must be defined as a string');
        });
        it('should throw an error if the argument is defined as an empty string', function () {
            expect(function () {
                acron.setWrapper('');
            }).toThrowError('The wrapper argument cannot be an empty string');
        });
    });

    describe('setAttribute()', function () {
        it('should accept a key argument and a value argument that sets a new attribute in the attributes property', function () {
            acron.setAttribute('id', 'myId');
            expect(acron.attributes).toEqual({
                id: 'myId'
            });
        });
        it('should throw an error if the key argument is not defined', function () {
            expect(function () {
                acron.setAttribute();
            }).toThrowError('The key must be defined as a string');
        });
        it('should throw an error if the key argument is defined as an empty string', function () {
            expect(function () {
                acron.setAttribute('', 'myId');
            }).toThrowError('The key must be defined as a string');
        });
        it('should throw an error if the value argument is not defined', function () {
            expect(function () {
                acron.setAttribute('id');
            }).toThrowError('The value must be defined');
        });
    });

    describe('setAttributes()', function () {
        it('should accept an object with key and value pairs for each attribute to be added to the attributes property', function () {
            acron.setAttributes({
                id: 'myId',
                'class': 'myClass'
            });
            expect(acron.attributes).toEqual({
                id: 'myId',
                'class': 'myClass'
            });
        });
        it('should throw an error if the attributes argument is not defined as an object', function () {
            expect(function () {
                acron.setAttributes();
            }).toThrowError('The attributes argument must be defined as an object');
            expect(function () {
                acron.setAttributes('');
            }).toThrowError('The attributes argument must be defined as an object');
        });
    });

    describe('hasClass()', function () {
        it('should accept an element and a class string as agruments and return true if the element has the given class', function () {
            var a = document.createElement('a');
            a.className = 'myClass';
            expect(acron.hasClass(a, 'myClass')).toBe(true);
        });
        it('should accept an element and a class string as agruments and return false if the element does not have the given class', function () {
            var a = document.createElement('a');
            a.className = 'myClass';
            expect(acron.hasClass(a, 'anotherClass')).toBe(false);
        });
        it('should throw an error if the element argument is not defined as an element', function () {
            expect(function () {
                acron.hasClass();
            }).toThrowError('The element must be defined as an element');
        });
        it('should throw an error if the className argument is not defined as a string', function () {
            var a = document.createElement('a');
            expect(function () {
                acron.hasClass(a);
            }).toThrowError('The className must be defined as a string');
        });
    });

    describe('isElementSet()', function () {
        it('should return true if an element has been set to the instance', function () {
            var a = document.createElement('a');
            acron.element = a;
            expect(acron.isElementSet()).toBe(true);
        });
        it('should return false if an element has not been defined to the instance', function () {
            expect(acron.isElementSet()).toBe(false);
        });
    });

    describe('isPatternSet()', function () {
        it('should return true if a pattern has been set to the instance', function () {
            acron.pattern = /mypattern/g;
            expect(acron.isPatternSet()).toBe(true);
        });
        it('should return false if a pattern has not been set to the instance', function () {
            expect(acron.isPatternSet()).toBe(false);
        });
    });

    describe('isWrapperSet()', function () {
        it('should return true if a wrapper is defined to the instance', function () {
            acron.wrapper = 'p';
            expect(acron.isWrapperSet()).toBe(true);
        });
        it('should return false if a wrapper is not defined to the instance', function () {
            acron.wrapper = undefined;
            expect(acron.isWrapperSet()).toBe(false);
        });
    });

    describe('addClassToElement()', function () {
        it('should accept an element argument that has no existing class attribute and a className argument and set it to the class attribute', function () {
            var a = document.createElement('a');
            acron.addClassToElement(a, 'myClass');
            expect(a.className).toEqual('myClass');
        });
        it('should accept an element argument that has an existing class attribute and a className argument and add it to the class attribute', function () {
            var a = document.createElement('a'),
                classes;

            a.className = 'myClass';
            acron.addClassToElement(a, 'mySecondClass');
            classes = a.className.split(' ');
            expect(classes[0]).toEqual('myClass');
            expect(classes[1]).toEqual('mySecondClass');
        });
        it('should accept an element argument that has an existing class attribute and a className argument that matches the class attribute and do nothing', function () {
            var a = document.createElement('a');
            a.className = 'myClass';
            acron.addClassToElement(a, 'myClass');
            expect(a.className).toEqual('myClass');
        });
        it('should throw an error if the element argument is not defined as an element', function () {
            expect(function () {
                acron.addClassToElement(undefined, 'myClass');
            }).toThrowError('The element argument must be defined as an element');
            expect(function () {
                acron.addClassToElement({}, 'myClass');
            }).toThrowError('The element argument must be defined as an element');
        });
        it('should throw an error if the className argument is not defined as a string', function () {
            expect(function () {
                acron.addClassToElement(document.createElement('a'), undefined);
            }).toThrowError('The className argument must be defined as a string');
        });
    });

    describe('addAttributesToElement()', function () {
        it('should add all the given attributes to the given element argument', function () {
            var element = document.createElement('a'),
                attributes = {
                    className: 'myClass',
                    title: 'myTitle'
                };

            acron.addAttributesToElement(element, attributes);
            expect(element.className).toEqual('myClass');
            expect(element.title).toEqual('myTitle');
        });
        it('should throw an error if the element argument is not defined as an element', function () {
            expect(function () {
                acron.addAttributesToElement(undefined, {});
            }).toThrowError('The element argument must be defined as an element');
        });
        it('should throw an error if the attributes argument is not defined as an object', function () {
            expect(function () {
                acron.addAttributesToElement(document.createElement('a'), 'string');
            }).toThrowError('The attributes argument must be defined as an object');
        });
    });

    describe('bind()', function () {
        it('should accept a name argument and a func argument and set them to the events property', function () {
            acron.bind('myEvent', function () {});
            expect(typeof acron.events.myEvent).toEqual('function');
        });
        it('should throw an error if the name argument is not defined as a string', function () {
            expect(function () {
                acron.bind(undefined, function () {});
            }).toThrowError('The name argument must be defined as a string');
        });
        it('should throw an error of the func argument is not defined as a function', function () {
            expect(function () {
                acron.bind('myEvent', undefined);
            }).toThrowError('The func argument must be defined as a function');
        });
    });

    describe('trigger()', function () {
        it('should accept a name argument and execute the stored event in the events property', function () {
            var num = 1;
            acron.events.myEvent = function () {
                num = 2;
            };
            acron.trigger('myEvent');
            expect(num).toEqual(2);
        });
        it('should accept an args argument defined as an array and provide them to the executed function', function () {
            var arg1Value,
                arg2Value,
                arg3Value;

            acron.events.myEvent = function (arg1, arg2, arg3) {
                arg1Value = arg1;
                arg2Value = arg2;
                arg3Value = arg3;
            };

            acron.trigger('myEvent', ['string', 52, {}]);
            expect(arg1Value).toEqual('string');
            expect(arg2Value).toEqual(52);
            expect(arg3Value).toEqual({});
        });
        it('should not throw an error if the event does not exist', function () {
            expect(function () {
                acron.trigger('string');
            }).not.toThrowError();
        });
    });

    describe('getStringPositions()', function () {

        it('should return the positions of the given global regexp argument in the given text argument', function () {
            var text = 'this is a string with string mentioned twice',
                regexp = /string/g;

            expect(acron.getStringPositions(text, regexp)).toEqual([{
                text: 'string',
                length: 6,
                index: 10
            }, {
                text: 'string',
                length: 6,
                index: 22
            }]);
        });
        it('should return the first position of the given non-global regexp argument in the given text argument', function () {
            var text = 'this is a string with string mentioned twice',
                regexp = /string/;

            expect(acron.getStringPositions(text, regexp)).toEqual([10]);
        });
        it('should return an empty array if the text argument or regexp argument are not defined', function () {
            expect(acron.getStringPositions('text')).toEqual([]);
            expect(acron.getStringPositions(undefined, /regex/)).toEqual([]);
        });
    });

    describe('init()', function () {

        it('should wrap the set pattern in the set node with any set attributes', function () {
            var p = document.createElement('p'),
                newElement;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.init();
            newElement = p.getElementsByTagName('abbr');
            expect(newElement.length).toEqual(1);
            expect(newElement[0].className.indexOf('myClass')).toBeGreaterThan(-1);
        });
        it('should execute the beforeWrap event', function () {
            var p = document.createElement('p'),
                eventFired = false;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.bind('beforeWrap', function () {
                eventFired = true;
            });
            acron.init();
            expect(eventFired).toBe(true);
        });
        it('should provide the text that is about to be wrapped as the first argument of beforeWrap', function () {
            var p = document.createElement('p'),
                firstArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.bind('beforeWrap', function (text) {
                firstArgumentValue = text;
            });
            acron.init();
            expect(firstArgumentValue).toBe('some');
        });
        it('should provide the wrapper that is about to be wrap the text as the second argument of beforeWrap', function () {
            var p = document.createElement('p'),
                secondArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setWrapper('span');
            acron.bind('beforeWrap', function (text, wrapper) {
                secondArgumentValue = wrapper;
            });
            acron.init();
            expect(secondArgumentValue.nodeType).toBe(1);
            expect(secondArgumentValue.nodeName).toBe('SPAN');
        });
        it('should execute the afterWrap event', function () {
            var p = document.createElement('p'),
                eventFired = false;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.bind('afterWrap', function () {
                eventFired = true;
            });
            acron.init();
            expect(eventFired).toBe(true);
        });
        it('should provide the text that was wrapped as the first argument of afterWrap', function () {
            var p = document.createElement('p'),
                firstArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.bind('afterWrap', function (text) {
                firstArgumentValue = text;
            });
            acron.init();
            expect(firstArgumentValue).toEqual('some');
        });
        it('should provide the text wrapper as the second argument of afterWrap', function () {
            var p = document.createElement('p'),
                secondArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setWrapper('span');
            acron.bind('afterWrap', function (text, wrapper) {
                secondArgumentValue = wrapper;
            });
            acron.init();
            expect(secondArgumentValue.nodeType).toEqual(1);
            expect(secondArgumentValue.nodeName).toEqual('SPAN');
        });

        it('should execute the afterWrapAll event', function () {
            var p = document.createElement('p'),
                eventFired = false;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.bind('afterWrapAll', function () {
                eventFired = true;
            });
            acron.init();
            expect(eventFired).toBe(true);
        });

        it('should provide an array of all the wrap elements that were added as the first argument of afterWrapAll', function () {
            var p = document.createElement('p'),
                firstArgumentValue;

            p.innerHTML = 'This is some text that mentions some twice';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.setWrapper('a');
            acron.bind('afterWrapAll', function (wrappers) {
                firstArgumentValue = wrappers;
            });
            acron.init();

            expect(firstArgumentValue.length).toEqual(2);
            expect(firstArgumentValue[0].nodeName).toEqual('A');
        });

        it('should throw an error if the element has not been set', function () {
            acron.element = undefined;
            acron.pattern = 'myPattern';
            acron.wrapper = 'a';

            expect(function () {
                acron.init();
            }).toThrowError('An element has not been defined. Use the setElement() method to set an element');
        });

        it('should throw an error if the pattern has not been set', function () {
            acron.element = document.createElement('div');
            acron.pattern = undefined;
            acron.wrapper = 'a';

            expect(function () {
                acron.init();
            }).toThrowError('A pattern has not been defined. Use the set pattern method to set a pattern');
        });

        it('should throw an error if the wrapper has not been set', function () {
            acron.element = document.createElement('div');
            acron.pattern = /myPattern/gi;
            acron.wrapper = undefined;

            expect(function () {
                acron.init();
            }).toThrowError('A wrapper has not been defined. Use the setWrapper method to set a wrapper');
        });

        it('should set the wrappers property to an empty array', function () {
            var p = document.createElement('p');

            p.innerHTML = 'This is some text that mentions some twice';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.setWrapper('a');
            acron.init();

            expect(acron.wrappers).toEqual([]);
        });
    });
});
