/*global module*/

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jslint: {
            client: {
                src: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
                directives: {
                    browser: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['src/js/**/*.js'],
                        dest: 'dist/js/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/js/acronymizer.min.js': ['dist/js/acronymizer.js']
                }
            }
        },
        clean: ['dist'],
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                reporters: ['dots']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', [
        'jshint',
        'jslint',
        'clean',
        'copy',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'jslint',
        'karma'
    ]);

};
