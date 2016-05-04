module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(config.allTemplate, {base: config.source})
            .pipe(gulp.dest(config.output));
    };
};