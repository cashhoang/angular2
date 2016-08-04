// map tells the System loader where to look for things
var map = {
  'app':                                'js/app',
  'common':                             'js/common',
  'lib':                                'js/lib',
  'rxjs':                               'temp/js/rxjs',
  '@angular':                           'temp/js/@angular'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
  'app':                                { main: 'app', defaultExtension: 'js' },
  'common':                             { defaultExtension: 'js' },
  'lib':                                { defaultExtension: 'js' },
  'rxjs':                               { defaultExtension: 'js' },
};

var packageNames = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function(pkgName) {
  packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

System.config({
  map: map,
  packages: packages
});

