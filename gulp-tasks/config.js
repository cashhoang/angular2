'use strict';
var GulpConfig = (function () {
    function gulpConfig(plugins) {
        var profile = plugins.util.env.profile;
        profile = (profile ? profile : 'dev').toLowerCase();
        if (profile == 'production') {
            profile = 'prod';
        }
        plugins.util.log('Using ' + profile + ' profile...');
        
        return {
            profile: profile,
            debug: profile == 'dev',
            source: 'src',
            tscripts: {
                dev: [
                    'src/**/*.ts',
                    
                ],
                uat: [
                    'src/**/*.ts',
                    
                ],
                prod: [
                    'src/**/*.ts',
                    
                ]
            },
            externalJs: [
                         'node_modules/systemjs/dist/system.src.js',
                         'node_modules/jquery/dist/jquery.js',
                         'node_modules/core-js/client/shim.js',
                         'node_modules/zone.js/dist/zone.js',
                         'system.config.js',
                         'node_modules/moment/moment.js',
                         'node_modules/jssha/src/sha.js'
                         ],
            angular2Js: ['node_modules/@angular/**/*'],
            rxJs: ['node_modules/rxjs/**/*'],
            allTemplate: 'src/app/**/*.html',
            allCss: [
                'node_modules/semantic-ui/dist/semantic.min.css',
                'node_modules/ng2-toastr/bundles/ng2-toastr.min.css'
            ],
            messages: ['src/messages/*.json'],
            messagesOutput: 'build/messages',
            assets: {
                src: ['node_modules/semantic-ui/dist/themes/default/**/*'],
                dest: 'build/styles/themes/default'
            },
            index: 'src/index.html',
            sass: ['src/styles/*.scss'],
            allsass: ['src/**/*.scss'],
            output: 'build',
            cssOutput: 'build/styles'
        };
    }
    return gulpConfig;
})();
module.exports = GulpConfig;