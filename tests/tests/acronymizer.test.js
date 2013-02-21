/*jslint maxerr: 50, indent: 4, es5: true*/
/*globals document, chai, describe, it, before, Acronymizer*/

describe('Acronymizer', function () {
    'use strict';

    var acron;
    before(function () {
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

    describe('error()', function () {
        var acron;
        before(function () {
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
        before(function () {
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
        before(function () {
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
        before(function () {
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
        before(function () {
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
        before(function () {
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
        before(function () {
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
        before(function () {
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
            }, Error, 'The attributes arguments must be defined as an object');
            chai.assert.throw(function () {
                acron.setAttributes('');
            }, Error, 'The attributes arguments must be defined as an object');
        });
    });

    describe('hasClass()', function () {
        var acron;
        before(function () {
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

    describe('allOptionsSet()', function () {
        var acron;
        before(function () {
            acron = new Acronymizer();
        });

        it('should be a function', function () {
            chai.assert.isFunction(acron.allOptionsSet);
        });
        it('should return true if the element, pattern and wrapper are all defined', function () {
            acron.element = document.createElement('a');
            acron.pattern = 'myPattern';
            acron.wrapper = 'span';
            chai.assert.strictEqual(acron.allOptionsSet(), true);
        });
        it('should return false if the element is not defined', function () {
            acron.element = undefined;
            acron.pattern = 'myPattern';
            acron.wrapper = 'span';
            chai.assert.strictEqual(acron.allOptionsSet(), false);
        });
        it('should return false if the pattern is not defined', function () {
            acron.element = document.createElement('a');
            acron.pattern = undefined;
            acron.wrapper = 'span';
            chai.assert.strictEqual(acron.allOptionsSet(), false);
        });
        it('should return false if the wrapper is not defined', function () {
            acron.element = document.createElement('a');
            acron.pattern = 'myPattern';
            acron.wrapper = undefined;
            chai.assert.strictEqual(acron.allOptionsSet(), false);
        });
    });

    describe('addClassToElement()', function () {
        var acron;
        before(function () {
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
        before(function () {
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

    describe('go()', function () {
        var acron;
        before(function () {
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
        it('should throw an error if the element has not been set', function () {
            acron.element = undefined;
            acron.pattern = 'myPattern';
            acron.wrapper = 'a';
            chai.assert.throw(function () {
                acron.go();
            }, Error, 'All options have not been defined correctly');
        });
        it('should throw an error if the pattern has not been set', function () {
            acron.element = document.createElement('div');
            acron.pattern = undefined;
            acron.wrapper = 'a';
            chai.assert.throw(function () {
                acron.go();
            }, Error, 'All options have not been defined correctly');
        });
        it('should throw an error if the wrapper has not been set', function () {
            acron.element = document.createElement('div');
            acron.pattern = 'myPattern';
            acron.wrapper = undefined;
            chai.assert.throw(function () {
                acron.go();
            }, Error, 'All options have not been defined correctly');
        });
    });
});