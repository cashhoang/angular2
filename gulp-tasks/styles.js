var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

module.exports = function(gulp, plugins, config) {
    return function() {
        var processors = [
            autoprefixer({browsers: ['last 2 version']}),
            mqpacker,
            csswring
        ];
        var sassStream = buildSass();
        return require('merge2')(sassStream, gulp.src(config.allCss))
                    .pipe(plugins.concat('app.css'))
                    .pipe(plugins.postcss(processors))
                    .pipe(gulp.dest(config.cssOutput));
    };
    
    function buildSass() {
       return gulp.src(config.sass)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass());
    }
};
