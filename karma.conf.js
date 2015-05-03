/*jslint maxerr: 50, indent: 4*/
/*globals module*/

module.exports = function (config) {

    'use strict';

    config.set({

        basePath: './',
        frameworks: ['jasmine'],
        files: [
            'src/acronymizer.js',
            'tests/acronymizer.test.js'
        ],
        autoWatch: true,
        browsers: ['PhantomJS']
    });
};