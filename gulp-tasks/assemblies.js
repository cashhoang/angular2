module.exports = function(gulp, plugins, config) {
    return function() {
        var injectSource = [
            config.output + '/vendors.js',
            config.cssOutput + '/**/*.css'];
        return gulp.src(config.index)
            .pipe(plugins.inject(gulp.src(injectSource, {read: false}), {ignorePath: config.output, addRootSlash: false}))
            .pipe(gulp.dest(config.output));
    };
};
