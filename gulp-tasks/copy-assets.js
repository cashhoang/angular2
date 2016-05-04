module.exports = function(gulp, plugins, config) {
    return function() {
        gulp.src(config.assets.src)
            .pipe(gulp.dest(config.assets.dest));
            
        // gulp.src(config.messages)
        //     .pipe(gulp.dest(config.messagesOutput));            
    }
};
