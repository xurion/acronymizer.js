/*global module*/

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'tests/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['src/acronymizer.js'],
                        dest: 'dist/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/acronymizer.min.js': ['src/acronymizer.js']
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', [
        'jshint',
        'karma',
        'clean',
        'copy',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);
};
