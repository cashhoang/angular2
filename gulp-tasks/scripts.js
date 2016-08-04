
module.exports = function(gulp, plugins, config) {
    return function() {
        require('del')(config.output + "/vendors.js");
        return build(config.profile);
    };

    function buildLibJavascript() {
        /* External JS lib */
        var base = 'node_modules';
        return gulp.src(config.externalJs)
            .pipe(plugins.jshint.reporter('default'))
            .pipe(plugins.sort(function (v1, v2) {
                var v1Index = findVendorIndex(config.allVendorJavascript, base, v1);
                var v2Index = findVendorIndex(config.allVendorJavascript, base, v2);
                return (v1Index > v2Index) ? 1 : (v1Index < v2Index) ? -1 : 0;
            }))
            .pipe(plugins.concat('external.js'))
            .pipe(plugins.uglify({mangle: false}));
    }
    
    function buildSrcTsScript(profile) {
        /* Src TS */
        var ts = plugins.typescript;
        var srcTypeScript = config.tscripts.dev;
        if (config.profile == 'uat') {
            srcTypeScript = config.tscripts.uat;
        }
        if (config.profile == 'prod') {
            srcTypeScript = config.tscripts.prod;
        }
        
        var tsProject = ts.createProject('tsconfig.json');
        var tsStream = gulp.src(srcTypeScript)
            .pipe(plugins.sourcemaps.init())
            .pipe(ts(tsProject)).js
            .pipe(plugins.sourcemaps.write());
            
        if(profile != "dev") {
            tsStream = tsStream.pipe(plugins.uglify({mangle: false}));
        }
        
        tsStream.pipe(gulp.dest(config.output + "/js"));
        
        return tsStream;
    }
        
    function findVendorIndex(allVendorJavascript, base, v) {
        var vendor = v.path.substring(v.path.indexOf(base));
        for (var i = 0; i < allVendorJavascript; ++i) {
            if(allVendorJavascript[i].test(vendor)) {
                console.log(i);
                return i;
            }
        }
        return -1;
    }
    
    function copyLib() {
        var ts1 = gulp.src(config.rxJs)
            .pipe(gulp.dest('build/temp/js/rxjs'));
        var ts2 = gulp.src(config.angular2Js)
            .pipe(gulp.dest('build/temp/js/@angular'));
            
        return require('merge2')(ts1, ts2);
    }

    function build(env) {
        var libStream = copyLib();
        var externalJsStream = buildLibJavascript();
        var tsStream = buildSrcTsScript(env);
        
        var mergeStream = require('merge2')(externalJsStream).pipe(plugins.concat('vendors.js')).pipe(gulp.dest(config.output));
        
        return require('merge2')(mergeStream, tsStream, libStream);
    }
};
