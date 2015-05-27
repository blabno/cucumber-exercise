/*jshint camelcase:false*/

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt)
{
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-protractor-webdriver');

    grunt.initConfig({

        protractor_webdriver: {
            driver: {
                options: {
                }
            }
        },
        protractor: {
            options: {
                configFile: 'test/config.js',
                keepAlive: false,
                noColor: false
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            },
            firefox: {
                options: {
                    args: {
                        browser: 'firefox'
                    }
                }
            },
            phantomjs: {
                options: {
                    args: {
                        browser: 'phantomjs'
                    }
                }
            }
        }

    });


    grunt.registerTask('test', [
        'protractor:firefox'
    ]);

    grunt.registerTask('test:phantomjs', [
        'protractor_webdriver', 'protractor:phantomjs'
    ]);

};
