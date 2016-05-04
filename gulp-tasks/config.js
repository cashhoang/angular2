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
                    'node_modules/angular2/typings/browser.d.ts',
                    'src/**/*.ts',
                    '!src/app/bootstrap.ts'
                ],
                uat: [
                    'node_modules/angular2/typings/browser.d.ts',
                    'src/**/*.ts',
                    '!src/app/bootstrap.ts'
                ],
                prod: [
                    'node_modules/angular2/typings/browser.d.ts',
                    'src/**/*.ts',
                    '!src/app/bootstrap.ts'
                ]
            },
            externalJs: ['node_modules/jquery/dist/jquery.js',
                         'node_modules/semantic-ui/dist/semantic.js',
                         'node_modules/systemjs/dist/system-register-only.js'],
            allVendorJavascript: [
                'node_modules/reflect-metadata/Reflect.js',
                'node_modules/zone.js/dist/zone.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/router.js',
                'node_modules/angular2/bundles/angular2.js',
                'node_modules/angular2/bundles/http.js'
            ],
            allCss: ['node_modules/semantic-ui/dist/semantic.min.css'
            ],
            assets: {
                src: ['node_modules/semantic-ui/dist/themes/default/**/*'],
                dest: 'build/styles/themes/default'
            },
            allTemplate: ['src/**/*.html'],
            index: 'src/index.html',
            sass: ['src/styles/*.scss'],
            allsass: ['src/styles/*.scss', 'src/**/*.scss'],
            output: 'build',
            cssOutput: 'build/styles'
        };
    }
    return gulpConfig;
})();
module.exports = GulpConfig;