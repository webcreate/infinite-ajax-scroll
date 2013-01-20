/*global module:false*/
module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*!\n' +
              ' * <%= pkg.title || pkg.name %>\n' +
              ' * Version <%= pkg.version %>\n' +
              ' <%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
              ' *\n' +
              ' * Copyright (c) 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "type").join(", ") %>:\n' +
              ' * <%= _.pluck(pkg.licenses, "url").join("\n * ") %>\n' +
              ' */'
        },
        lint: {
            files: ['grunt.js', 'src/*.js'] //, 'spec/**/*.js'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                'browser': true,
                'jquery': true,
                'es5': true,
                'esnext': true,
                'bitwise': true,
                //'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'immed': true,
                'indent': 4,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'quotmark': 'single',
                'regexp': true,
                'undef': true,
                'unused': true,
                'strict': true,
                'trailing': true,
                'smarttabs': true
            },
            globals: {
                jQuery: true
            }
        },
        uglify: {},
        copy : {
            dist : {
                files : {
                    'dist/css/' : 'src/css/*',
                    'dist/images/' : 'src/images/*',
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'lint copy concat min');

    grunt.loadNpmTasks('grunt-contrib-copy');
};
