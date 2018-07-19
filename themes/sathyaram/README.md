# Sathyaram Theme

The **Sathyaram** Theme is for [Grav CMS](http://github.com/getgrav/grav).  This README.md file should be modified to describe the features, installation, configuration, and general usage of this theme.

## Front Assets Build Process

The frontend assets (CSS and JavaScript) are compiled using node.js and gulp - make sure these are installed.

To install gulp globally run: `npm install gulp-cli -g`

1. Open a terminal inside the directory this `README.md` file is in.
2. Install the dependencies
    * `npm install`
3. Run the build process
    * `gulp build`

There are numerous other more fine-grained gulp commands/tasks. You can also run `gulp help` to see a list of available commands and their descriptions.

## Optimizing Images

1. Try and limit the width of images to approximately `2000px`
2. Compress the images losslessly ([https://tinypng.com/](https://tinypng.com/))

## JavaScript Libraries

The website makes heavy use of [fullPage.js](https://alvarotrigo.com/fullPage/).
