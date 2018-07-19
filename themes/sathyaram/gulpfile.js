/**
 * Gulpfile for http://sathyaram.com/ frontend assets
 *
 * Run command `gulp help` to see available commands
 *
 * CSS
 * - Compiles SCSS to CSS
 * - Autoprefixes styles for wider browser support
 * - Minifies styles for smaller file sizes
 *
 * JS
 * - Concatenates multiple scripts together
 * - Lints the scripts for good code standards
 * - Minifies and mangles the scripts for smaller file sizes
 */
'use strict';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Load Dependencies

// Gulp and utilities
var gulp   = require('gulp-help')(require('gulp'));
var gutil  = require('gulp-util');
var notify = require('gulp-notify');

// Plugins for transforming our code
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var size         = require('gulp-size');
var uglify       = require('gulp-uglify');

// Stops Uglify from stopping watch processes
// and outputs the error to the console
function handleErr(err) {
  gutil.log(err.toString());
  this.emit('end');
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Configuration

// Grab data from the package.json file
var pkg = require('./package.json');

// Set up and object with the paths we'll need
var paths = {
  // Paths related to the CSS
  css: {
    // Paths related to the full CSS
    full: {
      file: pkg.name,                     // The desired name of output file (without extension)
      input: './src/scss/sathyaram.scss', // The input file to pass to the Sass compiler
      watch: './src/scss/**/*.scss',      // A glob of files to watch for changes
      output: './css'                     // The directory to write the output file to
    },
    // Paths related to the critical-path CSS
    critical: {
      file: 'critical',                  // The desired name of output file (without extension)
      input: './src/scss/critical.scss', // The input file to pass to the Sass compiler
      watch: './src/scss/**/*.scss',     // A glob of files to watch for changes
      output: './templates/critical/'    // The directory to write the output file to
    }
  },
  // Paths related to the JavaScript
  js: {
    // Paths related to our custom scripts
    custom: {
      file: pkg.name,                   // The desired name of output file (without extension)
      input: './src/js/custom/*.js',    // A glob of files to concatenate together
      watch: './src/js/custom/**/*.js', // A glob of files to watch for changes
      output: './js'                    // The directory to write the output file to
    },
    // Paths related to vendor scripts
    vendor: {
      file: 'vendor',                   // The desired name of output file (without extension)
      input: './src/js/vendor/*.js',    // A glob of files to concatenate together
      watch: './src/js/vendor/**/*.js', // A glob of files to watch for changes
      output: './js'                    // The directory to write the output file to
    }
  }
};

// The list of browsers that the autoprefixer will take into consideration when
// prefixing our styles. Copied from the latest version of Bootstrap which seems
// like a decent level of browser support.
var browserList = [
  'last 1 major version',
  '>= 1%',
  'Chrome >= 45',
  'Firefox >= 38',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30'
];

// The full autoprefixer config, including the browserlits from above
var autoPrefix = { browsers: browserList, cascade: false };

// The configuration for the gulp-size plugin
var showSizes  = { pretty: true, showFiles: true, showTotal: true };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Build Functionality

// Builds the full CSS
gulp.task('build:css:full', 'Builds full CSS', function() {
  return gulp
    // Select our SCSS entry file
    .src(paths.css.full.input)
    // Compiled the SCSS to CSS
    .pipe(sass().on('error', sass.logError))
    // Autoprefix our styles
    .pipe(autoprefixer(autoPrefix))
    // Name the first (unminifed) file
    .pipe(rename(paths.css.full.file + '.css'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the first (unminifed) file
    .pipe(gulp.dest(paths.css.full.output))
    // Minify and clean the CSS
    .pipe(cleanCSS())
    // Name the second (minifed) file
    .pipe(rename(paths.css.full.file + '.min.css'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the second (minifed) file
    .pipe(gulp.dest(paths.css.full.output))
    // Send a desktop notification to let us know
    .pipe(notify('CSS build complete.'));
});

// Watch the SCSS for changes and re-build full CSS
gulp.task('watch:css:full', 'Watches SCSS for changes and rebuilds full CSS', function() {
  // Watch the glob we provided above and if changes are detected,
  // run the 'build:css' task to re-build the styles.
  gulp.watch(paths.css.full.watch, ['build:css:full']);
});

// Builds the critical-path CSS
// Becomes a twig template for injecting into the base template's <head>
gulp.task('build:css:critical', 'Builds critical-path CSS', function() {
  return gulp
    // Select our SCSS entry file
    .src(paths.css.critical.input)
    // Compiled the SCSS to CSS
    .pipe(sass().on('error', sass.logError))
    // Autoprefix our styles
    .pipe(autoprefixer(autoPrefix))
    // Name the first (unminifed) file
    .pipe(rename(paths.css.critical.file + '.html.twig'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the first (unminifed) file
    .pipe(gulp.dest(paths.css.critical.output))
    // Minify and clean the CSS
    .pipe(cleanCSS({ keepSpecialComments: false }))
    // Name the second (minifed) file
    .pipe(rename(paths.css.critical.file + '.min.html.twig'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the second (minifed) file
    .pipe(gulp.dest(paths.css.critical.output))
    // Send a desktop notification to let us know
    .pipe(notify('CSS build complete.'));
});

// Watch the SCSS for changes and re-build critical-path CSS
gulp.task('watch:css:critical', 'Watches SCSS for changes and rebuilds critical-path CSS', function() {
  // Watch the glob we provided above and if changes are detected,
  // run the 'build:css' task to re-build the styles.
  gulp.watch(paths.css.critical.watch, ['build:css:critical']);
});

// Builds both CSS files
gulp.task(
  'build:css',
  'Builds all CSS',
  ['build:css:full', 'build:css:critical']
);

// Watch the SCSS for changes and re-build both CSS files
gulp.task(
  'watch:css',
  'Watches SCSS for changes and rebuilds all CSS',
  ['watch:css:full', 'watch:css:critical']
);

// Builds the custom JavaScript
gulp.task('build:js:custom', 'Builds all custom JavaScript', function() {
  return gulp
    // Select our custom JS files
    .src(paths.js.custom.input)
    // Concatenate all the files together and rename the resulting file
    .pipe(concat(paths.js.custom.file + '.js'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the first (unminified) file
    .pipe(gulp.dest(paths.js.custom.output))
    // Minify and mangle our scripts
    .pipe(uglify().on('error', handleErr))
    // Name the second (minifed) file
    .pipe(rename(paths.js.custom.file + '.min.js'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the second (minified) file
    .pipe(gulp.dest(paths.js.custom.output))
    // Send a desktop notification to let us know
    .pipe(notify('JavaScript build complete.'));
});

// Watch the custom JavaScript for changes and re-build
gulp.task('watch:js:custom', 'Watches custom JavaScript for changes and rebuilds', function() {
  // Watch the glob we provided above and if changes are detected,
  // run the 'build:js:custom' task to re-build the scripts.
  gulp.watch(paths.js.custom.watch, ['build:js:custom']);
});

// Builds the vendor JavaScript
gulp.task('build:js:vendor', 'Builds all vendor JavaScript', function() {
  return gulp
    // Select our vendor JS files
    .src(paths.js.vendor.input)
    // Concatenate all the files together and rename the resulting file
    .pipe(concat(paths.js.vendor.file + '.js'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the first (unminified) file
    .pipe(gulp.dest(paths.js.vendor.output))
    // Minify and mangle our scripts
    .pipe(uglify().on('error', handleErr))
    // Name the second (minifed) file
    .pipe(rename(paths.js.vendor.file + '.min.js'))
    // Display the size of the file
    .pipe(size(showSizes))
    // Output the second (minified) file
    .pipe(gulp.dest(paths.js.vendor.output))
    // Send a desktop notification to let us know
    .pipe(notify('JavaScript build complete.'));
});

// Watch the vendor JavaScript for changes and re-build
gulp.task('watch:js:vendor', 'Watches vendor JavaScript for changes and rebuilds', function() {
  // Watch the glob we provided above and if changes are detected,
  // run the 'build:js:vendor' task to re-build the scripts.
  gulp.watch(paths.js.vendor.watch, ['build:js:vendor']);
});

// Build all of the JavaScript
gulp.task(
  'build:js',
  'Builds all of the JavaScript',
  ['build:js:custom', 'build:js:vendor']
);

// Watch all of the JavaScript for changes and re-build
gulp.task(
  'watch:js',
  'Watches all of the JavaScript for changes and rebuilds',
  ['watch:js:custom', 'watch:js:vendor']
);

// Build everything (scripts and styles)
gulp.task(
  'build',
  'Builds everything (CSS and JavaScript)',
  ['build:css', 'build:js']
);

// Watch everything for changes and re-build
gulp.task(
  'watch',
  'Watches everything (CSS and JavaScript) for changes and rebuilds',
  ['watch:css', 'watch:js']
);

// Set the default task to build everything
gulp.task('default', ['build']);
