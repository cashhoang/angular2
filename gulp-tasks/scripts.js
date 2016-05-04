module.exports = function(gulp, plugins, config) {
    return function() {
        return build(config.profile);
    };

    function buildLibJavascript() {
        /* External JS lib */
        return gulp.src(config.externalJs)
            .pipe(plugins.jshint.reporter('default'))
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
        
        return tsStream;
    }
    
    function buildVendorScript() {
        /* Vendor Script */
        var base = 'node_modules';
        return gulp.src(config.allVendorJavascript, {base: base})
            .pipe(plugins.sort(function (v1, v2) {
                var v1Index = findVendorIndex(config.allVendorJavascript, base, v1);
                var v2Index = findVendorIndex(config.allVendorJavascript, base, v2);
                return (v1Index > v2Index) ? 1 : (v1Index < v2Index) ? -1 : 0;
            }))
            .pipe(plugins.concat('vendors.js'))
            .pipe(plugins.uglify({mangle: false}));
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

    function build(env) {
        var externalJsStream = buildLibJavascript();
        var tsStream = buildSrcTsScript(env);
        var vjsStream = buildVendorScript();
        
        // TODO cash
        var ts = plugins.typescript;
        var tsProject = ts.createProject({
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": false
        });
        var bootstrapStream = gulp.src("src/app/bootstrap.ts")
            .pipe(plugins.sourcemaps.init())
            .pipe(ts(tsProject)).js
            .pipe(plugins.sourcemaps.write());
            
        if(env != "dev") {
            bootstrapStream = bootstrapStream.pipe(plugins.uglify({mangle: false}));
        }
        
        bootstrapStream.pipe(gulp.dest(config.output));
        
        var mergeStream = require('merge2')([externalJsStream, vjsStream, tsStream]).pipe(plugins.concat('vendors.js')).pipe(gulp.dest(config.output));
        
        return require('merge2')([mergeStream, bootstrapStream]);
    }
};
