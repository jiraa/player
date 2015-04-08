'use strict';
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        page: {
            app: 'app',
            dist: 'dist'
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*',
                        'dist/.git*'
                    ]
                }]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= page.dist %>/css',
                    src: '{,*/}*.{gif,jpeg,jpg,png,cur}',
                    dest: '<%= page.dist %>/css'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= page.app %>',
                    dest: '<%= page.dist %>',
                    src: [
                        '*.mp3',
                        '.htaccess',
                        'image/*.{cur,ico,f4v}',
                        'css/*.*',
                        'js/*.*',
                        '*.html'
                    ]
                }]
            }
        },
        autoprefixer: {
            dist: {
                expand: true,
                cwd: '<%= page.dist %>/css',
                src: ['**/*.css'],
                dest: '<%= page.dist %>/css'
            }
        },
        cssmin: {
            dist: {
                expand: true,
                cwd: '<%= page.dist %>/css',
                src: ['**/*.css'],
                dest: '<%= page.dist %>/css'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            buildall: {
                files: [{
                    expand:true,
                    cwd:'<%= page.dist %>/js',
                    src:'**/*.js',
                    dest: '<%= page.dist %>/js'
                }]
            },
        },
        concurrent: {
            server: [
                'copy'
            ]
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*',
                livereload: 35729
            },

            server: {
                options: {
                    open: true,
                    base: [
                        '<%= page.dist %>'
                    ]
                }
            }
        },
        watch: {
            livereload: {
                files: [ //下面文件的改变就会实时刷新网页
                    'app/*.html',
                    'app/css/{,*/}*.css',
                    'app/js/{,*/}*.js',
                    'app/image/{,*/}*.{png,jpg}'
                ],
                tasks: ['hi'],
                options: {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },
            }
        }
    });
    grunt.registerTask('hi', function() {
        grunt.task.run([
            'clean:dist',
            'concurrent:server',
            'autoprefixer',
            'cssmin',
            'imagemin',
            'uglify',
            'connect',
            'watch'
        ]);
    });
    grunt.registerTask('default', []);
    //test

};