const sysBuilder = require('systemjs-builder');
module.exports = function(gulp, plugins, config) {
    return function() {
        var builder = new sysBuilder('build', './system.config.js');
        return builder.buildStatic('app', 'build/app.js')
            .then(function () {
                return gulp.src([config.output + '/vendors.js', config.output + '/app.js']).pipe(plugins.concat('vendors.js')).pipe(gulp.dest(config.output));
            })
            .catch(function(err) {
                console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
            });
    };
};