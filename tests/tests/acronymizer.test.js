/*jslint maxerr: 50, indent: 4, es5: true*/
/*globals document, chai, describe, it, before, Acronymizer*/

describe('Acronymizer', function () {
    'use strict';

    var acron;
    beforeEach(function () {
        acron = new Acronymizer();
    });

    it('should be a function', function () {
        chai.assert.isFunction(Acronymizer);
    });
    it('should return an instance of itself when initialised', function () {
        chai.assert.instanceOf(acron, Acronymizer);
    });
    it('should have a default wrapper property set to "acron"', function () {
        chai.assert.strictEqual(acron.wrapper, 'acron');
    });
    it('should have a default attributes property as an empty object', function () {
        chai.assert.deepEqual(acron.attributes, {});
    });
    it('should have a default events property set to an empty object', function () {
        chai.assert.deepEqual(acron.events, {});
    });

    describe('error()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.error);
        });
        it('should throw an error with the given text', function () {
            chai.assert.throw(function () {
                acron.error('Test error');
            }, Error, 'Test error');
        });
        it('should throw an "unknown error" when no error text is defined', function () {
            chai.assert.throw(function () {
                acron.error();
            }, Error, 'Unknown error');
        });
    });

    describe('isElement()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.isElement);
        });
        it('should accept an element as an argument and return true', function () {
            var a = document.createElement('a');
            chai.assert.strictEqual(acron.isElement(a), true);
        });
        it('should accept a non-element as an argument and return false', function () {
            chai.assert.strictEqual(acron.isElement({}), false);
            chai.assert.strictEqual(acron.isElement('string'), false);
        });
        it('should accept undefined as an argument and return false', function () {
            chai.assert.strictEqual(acron.isElement(), false);
        });
    });

    describe('isTextNode()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.isTextNode);
        });
        it('should accept a single node argument and return true if it is a text node', function () {
            var textNode = document.createTextNode('myNode');
            chai.assert.strictEqual(acron.isTextNode(textNode), true);
        });
        it('should return false if the node argument is not defined as a text node', function () {
            var a = document.createElement('a');
            chai.assert.strictEqual(acron.isTextNode(a), false);
            chai.assert.strictEqual(acron.isTextNode('string'), false);
        });
    });

    describe('setElement()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.setElement);
        });
        it('should accept a single argument defined as an element and set it as the element property', function () {
            var a = document.createElement('a');
            acron.setElement(a);
            chai.assert.deepEqual(a, acron.element);
        });
        it('should throw an error if the argument is not defined as an element', function () {
            chai.assert.throw(function () {
                acron.setElement();
            }, Error, 'The element must be defined as an element');
            chai.assert.throw(function () {
                acron.setElement('string');
            }, Error, 'The element must be defined as an element');
            chai.assert.throw(function () {
                acron.setElement({});
            }, Error, 'The element must be defined as an element');
        });
    });

    describe('setPattern()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.setPattern);
        });
        it('should accept a single argument defined as a string and set it as the pattern property', function () {
            acron.setPattern('my pattern');
            chai.assert.strictEqual(acron.pattern, 'my pattern');
        });
        it('should throw a "Pattern must be defined as a string" error if the argument is not defined as a string', function () {
            chai.assert.throw(function () {
                acron.setPattern();
            }, Error, 'Pattern must be defined as a string');
            chai.assert.throw(function () {
                acron.setPattern({});
            }, Error, 'Pattern must be defined as a string');
        });
    });

    describe('setWrapper()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.setWrapper);
        });
        it('should accept a single argument defined as a string and set it as the wrapper property', function () {
            acron.setWrapper('a');
            chai.assert.strictEqual(acron.wrapper, 'a');
        });
        it('should throw an error if the argument is not defined as a string', function () {
            chai.assert.throw(function () {
                acron.setWrapper(22);
            }, Error, 'The wrapper argument must be defined as a string');
            chai.assert.throw(function () {
                acron.setWrapper({});
            }, Error, 'The wrapper argument must be defined as a string');
        });
        it('should throw an error if the argument is defined as an empty string', function () {
            chai.assert.throw(function () {
                acron.setWrapper('');
            }, Error, 'The wrapper argument cannot be an empty string');
        });
    });

    describe('setAttribute()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.setAttribute);
        });
        it('should accept a key argument and a value argument that sets a new attribute in the attributes property', function () {
            acron.setAttribute('id', 'myId');
            chai.assert.deepEqual(acron.attributes, {
                id: 'myId'
            });
        });
        it('should throw an error if the key argument is not defined', function () {
            chai.assert.throw(function () {
                acron.setAttribute();
            }, Error, 'The key must be defined as a string');
        });
        it('should throw an error if the key argument is defined as an empty string', function () {
            chai.assert.throw(function () {
                acron.setAttribute('', 'myId');
            }, Error, 'The key must be defined as a string');
        });
        it('should throw an error if the value argument is not defined', function () {
            chai.assert.throw(function () {
                acron.setAttribute('id');
            }, Error, 'The value must be defined');
        });
    });

    describe('setAttributes()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.setAttributes);
        });
        it('should accept an object with key and value pairs for each attribute to be added to the attributes property', function () {
            acron.setAttributes({
                id: 'myId',
                'class': 'myClass'
            });
            chai.assert.deepEqual(acron.attributes, {
                id: 'myId',
                'class': 'myClass'
            });
        });
        it('should throw an error if the attributes argument is not defined as an object', function () {
            chai.assert.throw(function () {
                acron.setAttributes();
            }, Error, 'The attributes argument must be defined as an object');
            chai.assert.throw(function () {
                acron.setAttributes('');
            }, Error, 'The attributes argument must be defined as an object');
        });
    });

    describe('hasClass()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.hasClass);
        });
        it('should accept an element and a class string as agruments and return true if the element has the given class', function () {
            var a = document.createElement('a');
            a.className = 'myClass';
            chai.assert.strictEqual(acron.hasClass(a, 'myClass'), true);
        });
        it('should accept an element and a class string as agruments and return false if the element does not have the given class', function () {
            var a = document.createElement('a');
            a.className = 'myClass';
            chai.assert.strictEqual(acron.hasClass(a, 'anotherClass'), false);
        });
        it('should throw an error if the element argument is not defined as an element', function () {
            chai.assert.throw(function () {
                acron.hasClass();
            }, Error, 'The element must be defined as an element');
        });
        it('should throw an error if the className argument is not defined as a string', function () {
            var a = document.createElement('a');
            chai.assert.throw(function () {
                acron.hasClass(a);
            }, Error, 'The className must be defined as a string');
        });
    });

    describe('isElementSet()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.isElementSet);
        });
        it('should return true if an element has been set to the instance', function () {
            var a = document.createElement('a');
            acron.element = a;
            chai.assert.isTrue(acron.isElementSet());
        });
        it('should return false if an element has not been defined to the instance', function () {
            chai.assert.isFalse(acron.isElementSet());
        });
    });

    describe('isPatternSet()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.isPatternSet);
        });
        it('should return true if a pattern has been set to the instance', function () {
            acron.pattern = 'string';
            chai.assert.isTrue(acron.isPatternSet());
        });
        it('should return false if a pattern has not been set to the instance', function () {
            chai.assert.isFalse(acron.isPatternSet());
        });
    });

    describe('isWrapperSet()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.isWrapperSet);
        });
        it('should return true if a wrapper is defined to the instance', function () {
            acron.wrapper = 'p';
            chai.assert.isTrue(acron.isWrapperSet());
        });
        it('should return false if a wrapper is not defined to the instance', function () {
            acron.wrapper = undefined;
            chai.assert.isFalse(acron.isWrapperSet());
        });
    });

    describe('addClassToElement()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.addClassToElement);
        });
        it('should accept an element argument that has no existing class attribute and a className argument and set it to the class attribute', function () {
            var a = document.createElement('a');
            acron.addClassToElement(a, 'myClass');
            chai.assert.strictEqual(a.className, 'myClass');
        });
        it('should accept an element argument that has an existing class attribute and a className argument and add it to the class attribute', function () {
            var a = document.createElement('a'),
                classes;

            a.className = 'myClass';
            acron.addClassToElement(a, 'mySecondClass');
            classes = a.className.split(' ');
            chai.assert.strictEqual(classes[0], 'myClass');
            chai.assert.strictEqual(classes[1], 'mySecondClass');
        });
        it('should accept an element argument that has an existing class attribute and a className argument that matches the class attribute and do nothing', function () {
            var a = document.createElement('a');
            a.className = 'myClass';
            acron.addClassToElement(a, 'myClass');
            chai.assert.strictEqual(a.className, 'myClass');
        });
        it('should throw an error if the element argument is not defined as an element', function () {
            chai.assert.throw(function () {
                acron.addClassToElement(undefined, 'myClass');
            }, Error, 'The element argument must be defined as an element');
            chai.assert.throw(function () {
                acron.addClassToElement({}, 'myClass');
            }, Error, 'The element argument must be defined as an element');
        });
        it('should throw an error if the className argument is not defined as a string', function () {
            chai.assert.throw(function () {
                acron.addClassToElement(document.createElement('a'), undefined);
            }, Error, 'The className argument must be defined as a string');
        });
    });

    describe('addAttributesToElement()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.addAttributesToElement);
        });
        it('should add all the given attributes to the given element argument', function () {
            var element = document.createElement('a'),
                attributes = {
                    className: 'myClass',
                    title: 'myTitle'
                };

            acron.addAttributesToElement(element, attributes);
            chai.assert.strictEqual(element.className, 'myClass');
            chai.assert.strictEqual(element.title, 'myTitle');
        });
        it('should throw an error if the element argument is not defined as an element', function () {
            chai.assert.throw(function () {
                acron.addAttributesToElement(undefined, {});
            }, Error, 'The element argument must be defined as an element');
        });
        it('should throw an error if the attributes argument is not defined as an object', function () {
            chai.assert.throw(function () {
                acron.addAttributesToElement(document.createElement('a'), 'string');
            }, Error, 'The attributes argument must be defined as an object');
        });
    });

    describe('setEvent()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.setEvent);
        });
        it('should accept a name argument and a func argument and set them to the events property', function () {
            acron.setEvent('myEvent', function () {});
            chai.assert.isFunction(acron.events.myEvent);
        });
        it('should throw an error if the name argument is not defined as a string', function () {
            chai.assert.throw(function () {
                acron.setEvent(undefined, function () {});
            }, Error, 'The name argument must be defined as a string');
        });
        it('should throw an error of the func argument is not defined as a function', function () {
            chai.assert.throw(function () {
                acron.setEvent('myEvent', undefined);
            }, Error, 'The func argument must be defined as a function');
        });
    });

    describe('fireEvent()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.fireEvent);
        });
        it('should accept a name argument and execute the stored event in the events property', function () {
            var num = 1;
            acron.events.myEvent = function () {
                num = 2;
            };
            acron.fireEvent('myEvent');
            chai.assert.strictEqual(num, 2);
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

            acron.fireEvent('myEvent', ['string', 52, {}]);
            chai.assert.strictEqual(arg1Value, 'string');
            chai.assert.strictEqual(arg2Value, 52);
            chai.assert.deepEqual(arg3Value, {});
        });
        it('should not throw an error if the event does not exist', function () {
            chai.assert.doesNotThrow(function () {
                acron.fireEvent('string');
            });
        });
    });

    describe('go()', function () {
        var acron;
        beforeEach(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.go);
        });
        it('should wrap the set pattern in the set node with any set attributes', function () {
            var p = document.createElement('p'),
                newElement;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.go();
            newElement = p.getElementsByTagName('acron');

            chai.assert.strictEqual(newElement.length, 1);
            chai.expect(newElement[0].className.indexOf('myClass')).to.be.above(-1);
        });
        it('should execute the beforeWrap event', function () {
            var p = document.createElement('p'),
                eventFired = false;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setEvent('beforeWrap', function () {
                eventFired = true;
            });
            acron.go();
            chai.assert.isTrue(eventFired);
        });
        it('should provide the text that is about to be wrapped as the first argument of beforeWrap', function () {
            var p = document.createElement('p'),
                firstArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setEvent('beforeWrap', function (text) {
                firstArgumentValue = text;
            });
            acron.go();
            chai.assert.strictEqual(firstArgumentValue, 'some');
        });
        it('should provide the wrapper that is about to be wrap the text as the second argument of beforeWrap', function () {
            var p = document.createElement('p'),
                secondArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setWrapper('span');
            acron.setEvent('beforeWrap', function (text, wrapper) {
                secondArgumentValue = wrapper;
            });
            acron.go();
            chai.assert.strictEqual(secondArgumentValue.nodeType, 1);
            chai.assert.strictEqual(secondArgumentValue.nodeName, 'SPAN');
        });
        it('should execute the afterWrap event', function () {
            var p = document.createElement('p'),
                eventFired = false;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setEvent('afterWrap', function () {
                eventFired = true;
            });
            acron.go();
            chai.assert.isTrue(eventFired);
        });
        it('should provide the text that was wrapped as the first argument of afterWrap', function () {
            var p = document.createElement('p'),
                firstArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.setEvent('afterWrap', function (text) {
                firstArgumentValue = text;
            });
            acron.go();
            chai.assert.strictEqual(firstArgumentValue, 'some');
        });
        it('should provide the text wrapper as the second argument of afterWrap', function () {
            var p = document.createElement('p'),
                secondArgumentValue;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setWrapper('span');
            acron.setEvent('afterWrap', function (text, wrapper) {
                secondArgumentValue = wrapper;
            });
            acron.go();
            chai.assert.strictEqual(secondArgumentValue.nodeType, 1);
            chai.assert.strictEqual(secondArgumentValue.nodeName, 'SPAN');
        });
        it('should execute the afterWrapAll event', function () {
            var p = document.createElement('p'),
                eventFired = false;

            p.innerHTML = 'This is some text';
            acron.setElement(p);
            acron.setPattern('some');
            acron.setEvent('afterWrapAll', function () {
                eventFired = true;
            });
            acron.go();
            chai.assert.isTrue(eventFired);
        });
        it('should provide an array of all the wrap elements that were added as the first argument of afterWrapAll', function () {
            var p = document.createElement('p'),
                firstArgumentValue;

            p.innerHTML = 'This is some text that mentions some twice';
            acron.setElement(p);
            acron.setAttribute('className', 'myClass');
            acron.setPattern('some');
            acron.setWrapper('a');
            acron.setEvent('afterWrapAll', function (wrappers) {
                firstArgumentValue = wrappers;
            });
            acron.go();
            chai.assert.isArray(firstArgumentValue);
            chai.assert.strictEqual(firstArgumentValue.length, 2);
            chai.assert.strictEqual(firstArgumentValue[0].nodeName, 'A');
        });
        it('should throw an error if the element has not been set', function () {
            acron.element = undefined;
            acron.pattern = 'myPattern';
            acron.wrapper = 'a';
            chai.assert.throw(function () {
                acron.go();
            }, Error, 'An element has not been defined. Use the setElement() method to set an element');
        });
        it('should throw an error if the pattern has not been set', function () {
            acron.element = document.createElement('div');
            acron.pattern = undefined;
            acron.wrapper = 'a';
            chai.assert.throw(function () {
                acron.go();
            }, Error, 'A pattern has not been defined. Use the set pattern method to set a pattern');
        });
        it('should throw an error if the wrapper has not been set', function () {
            acron.element = document.createElement('div');
            acron.pattern = 'myPattern';
            acron.wrapper = undefined;
            chai.assert.throw(function () {
                acron.go();
            }, Error, 'A wrapper has not been defined. Use the setWrapper method to set a wrapper');
        });
    });

    describe('init()', function () {
        it('should be a function', function () {
            var acron = new Acronymizer();
            chai.assert.isFunction(acron.init);
        });
        it('should accept a settings argument with an element value that sets the element property', function () {
            var a = document.createElement('a'),
                acron = new Acronymizer({
                    element: a
                });

            chai.assert.deepEqual(acron.element, a);
        });
        it('should accept a settings argument with a pattern value that sets the pattern property', function () {
            var acron = new Acronymizer({
                    pattern: 'myPattern'
                });

            chai.assert.strictEqual(acron.pattern, 'myPattern');
        });
        it('should accept a settings argument with a wrapper value that sets the wrapper property', function () {
            var acron = new Acronymizer({
                    wrapper: 'p'
                });

            chai.assert.strictEqual(acron.wrapper, 'p');
        });
        it('should accept a settings argument with an attributes value that sets the attributes property', function () {
            var acron = new Acronymizer({
                    attributes: {
                        href: 'page.html'
                    }
                });

            chai.assert.deepEqual(acron.attributes, {
                href: 'page.html'
            });
        });
        it('should accept a settings argument that contains element, pattern, wrapper and attributes values and set them to the correct properties', function () {
            var span = document.createElement('span'),
                acron;

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

            chai.assert.deepEqual(acron.attributes, {
                href: 'mixed.html',
                title: 'Link'
            });
        });
        it('should throw an error if the settings argument is not defined as an object', function () {
            chai.assert.throw(function () {
                var acron = new Acronymizer('string');
            }, Error, 'Settings must be defined as an object');
            chai.assert.throw(function () {
                var acron = new Acronymizer(44);
            }, Error, 'Settings must be defined as an object');
        });
    });
});