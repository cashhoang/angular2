var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {
    return function() {
        browserSync({
            port: 3000,
            server: {
                baseDir: config.output,
                middleware: [require('connect-history-api-fallback')()]
            }
        });
    };
};