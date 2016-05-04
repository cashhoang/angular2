'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});
var runSequence = require('run-sequence').use(gulp);
var config = require('./gulp-tasks/config.js')(plugins);

/* Load all tasks */
require('./gulp-tasks/loader').load([
    'clean', 
    'scripts', 
    'styles',
    'templates', 
    'copy-assets', 
    'assemblies',
    'serve'
], gulp, plugins, config);

gulp.task('build', function () {
    runSequence('clean', ['scripts', 'styles', 'templates', 'copy-assets'], 'assemblies');
});

gulp.task('build-local', function() {
    runSequence(['build'], 'watch', 'serve');
});

gulp.task('watch', function () {
    // gulp.watch(config.tscripts.dev, ['scripts', 'assemblies']);
    // gulp.watch(config.allTemplate, ['templates', 'assemblies']);
    // gulp.watch([config.allCss, config.allsass], ['css-build', 'assemblies']);
    // gulp.watch([config.hoiioScripts], ['copy-hoiio-script', 'assemblies']);
});

gulp.task('default', ['build']);