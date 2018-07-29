/**
 * Gulpfile for http://sathyaram.com/ page media/images
 *
 * Run command `gulp help` to see available commands
 */
'use strict';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Load Dependencies

var gulp         = require('gulp-help')(require('gulp'));
var colors       = require('colors');
var gm           = require('gulp-gm');
var imagemin     = require('gulp-imagemin');
var log          = require('fancy-log');
var newer        = require('gulp-newer');
var path         = require('path');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Configuration

// Set up and object with the paths we'll need
var paths = {
  // Paths related to the Images
  images: {
    base: './pages',         // A base parameter to pass to gulp.src
    input: './pages/**/*.*', // A glob of input images to compress
    output: './pages'        // Directory to output compressed images to
  }
};

// The maximum size for images (width or height)
var maxImageSize = 2000;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Build Functionality

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Images

// Optimizes/compresses all images in the ./src/images directory
gulp.task('optimize', 'Optimizes/compresses the images', function() {
  return gulp
    // Select our original, non-optimized images
    .src(paths.images.input, { base: paths.images.base })
    // Only process images that are new, or have been updated
    .pipe(newer(paths.images.output))
    // Use GraphicsMagick to resize the images if necessary
    .pipe(gm(function(gmfile, done) {
      // Get the filepath, relative to the theme dir
      var filePath = path.relative(__dirname, gmfile.source);
      // Get the file's current dimensions first
      gmfile.size(function(err, size) {
        var msg, newFile;
        // Only need to resize if either dimension exceeds our limit
        if (size.width > maxImageSize || size.height > maxImageSize) {
          msg = 'Resized'.cyan;
          // If its width is longer than height
          if (size.width > size.height) newFile = gmfile.resize(maxImageSize);
          // If its height is longer than width
          else if (size.width < size.height) newFile = gmfile.resize(null, maxImageSize);
          // If it's a square
          else newFile = gmfile.resize(maxImageSize, maxImageSize);
        }
        // No modifications to be made
        else {
          msg = 'Skipped'.grey;
          newFile = gmfile;
        }
        msg = '  ' + msg;
        msg += ' - (' + size.width + 'x' + size.height + ')';
        msg += ' ' + filePath;
        log(msg);
        done(null, newFile);
      });
    }))
    // Compress the images using imagemin
    .pipe(imagemin())
    // Output the modified images
    .pipe(gulp.dest(paths.images.output));
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// General

// Set the default task to optimize images
gulp.task('default', ['optimize']);





