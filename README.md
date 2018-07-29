# SathyaRam.com Website

## Configuration/Setup

### Getting Started

1. Download Grav and set up a fresh Grav installation as per their documentation.
2. Delete the `/user` directory of the new Grav website.
3. Open a terminal in the root of the new Grav website.
4. Clone the repository into a new `/user` folder:
    * `> git clone https://sathyatheram@bitbucket.org/sathyatheram/sathyaram.git user`

### Environment Variables

There is a configuration file that is specific the current environment. This is
for definining passwords, API keys and other sensitive information that should
not be committed to this repository.

When you set up an instance of the site, you will need to create your own
environment configuration:

1. Navigate to the `/config` directory.
2. Copy `env.example.yaml` to a new file named `env.yaml` (this file is automatically ignored by git)
3. Update the values inside `env.yaml` with the appropriate passwords/keys.

### .htacess

You need to make the following updates to the `.htaccess` file at the root of
the website files (`public_html` or the folder that *contains* the user folder).
Failure to include these lines may result in unexpected behaviour. This needs to
be done on any server loading the website, whether it is the live website or
your local development version.

> You should make sure that the `Rewrite` module for Apache is enabled.

#### 1. Set up `.htaccess` file

In the `.htaccess` file, create the following control structure if it does not
already exist:

```
<IfModule mod_rewrite.c>
    ...
</IfModule>
...
```

The block above simply checks that the Apache Rewrite module is available,
before executing the rules defined within the block. Preferably any rules
beginning with `Rewrite*` should go inside this block.

Next, make sure the `RewriteEngine On` and `RewriteBase /` rules are the first
rules inside the `<IfModule>` block:

```
<IfModule mod_rewrite.c>

    RewriteEngine On
    RewriteBase /

    ...

</IfModule>

...
```

#### 2. Redirect `http` to `https`

`https://www.inmotionhosting.com/support/website/ssl/how-to-force-https-using-the-htaccess-file`

Add the following two lines *directly before* the `RewriteEngine On` line:

```
RewriteCond %{REQUEST_URI} !^/[0-9]+\..+\.cpaneldcv$
RewriteCond %{REQUEST_URI} !^/\.well-known/pki-validation/[A-F0-9]{32}\.txt(?:\ Comodo\ DCV)?$
```

The two lines above are specific to InMotion hosting (see link above).

Then add the following two lines *directly after* the `RewriteBase /` line:

```
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://sathyaram.com/$1 [R=301,L]
```

The two lines above force SSL by redirecting all requests (`^(.*)$`) to the SSL
version of the website (`https://sathyaram.com/$1`).

When you're done, it should look like this:

```
<IfModule mod_rewrite.c>

    RewriteCond %{REQUEST_URI} !^/[0-9]+\..+\.cpaneldcv$
    RewriteCond %{REQUEST_URI} !^/\.well-known/pki-validation/[A-F0-9]{32}\.txt(?:\ Comodo\ DCV)?$

    RewriteEngine On
    RewriteBase /

    RewriteCond %{SERVER_PORT} 80
    RewriteRule ^(.*)$ https://sathyaram.com/$1 [R=301,L]

    ...

</IfModule>

...
```

#### 3. Remove `www.` from the URL

`https://www.inmotionhosting.com/support/website/htaccess/force-www-htaccess`

Add the following two lines inside the `<IfModule>` block, *after* the lines
we added in the previous steps above:

```
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ http://%1/$1 [R=301,L]
```

When you're done, it should look like this:

```
<IfModule mod_rewrite.c>

    RewriteCond %{REQUEST_URI} !^/[0-9]+\..+\.cpaneldcv$
    RewriteCond %{REQUEST_URI} !^/\.well-known/pki-validation/[A-F0-9]{32}\.txt(?:\ Comodo\ DCV)?$

    RewriteEngine On
    RewriteBase /

    RewriteCond %{SERVER_PORT} 80
    RewriteRule ^(.*)$ https://sathyaram.com/$1 [R=301,L]

    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ http://%1/$1 [R=301,L]

    ...

</IfModule>

...
```

#### 4. Redirect page sections

These rules enable the JavaScript functionality that treats each page section
as a page and removes the # from the location.

Add the following two lines *after* the `<IfModule>` block:

```
RedirectMatch 301 ^/(null|undefined)$ /
RedirectMatch 301 ^/(services|web|graphic|photography|contact)$ /#$1
```

When you're done, it should look like this:

```
<IfModule mod_rewrite.c>

    RewriteCond %{REQUEST_URI} !^/[0-9]+\..+\.cpaneldcv$
    RewriteCond %{REQUEST_URI} !^/\.well-known/pki-validation/[A-F0-9]{32}\.txt(?:\ Comodo\ DCV)?$

    RewriteEngine On
    RewriteBase /

    RewriteCond %{SERVER_PORT} 80
    RewriteRule ^(.*)$ https://sathyaram.com/$1 [R=301,L]

    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ http://%1/$1 [R=301,L]

    ...

</IfModule>

RedirectMatch 301 ^/(null|undefined)$ /
RedirectMatch 301 ^/(services|web|graphic|photography|contact)$ /#$1

...
```

## Directory Structure

### Root of repository (Grav `/user` folder)

```
/
├── config
├── data
├── pages
├── plugins
├── themes
├── gulpfile.js
├── package.json
├── package-lock.json
└── README.md
```

* `config` - Holds configurations for all other aspects of the website, such as Grav itself, or the plugins that have been installed.
* `pages` - Holds all of the website’s content. These are the pages and page sections of the site
* `plugins` - Holds the plugins being used by Grav.
* `themes` - Holds the themes being used by Grav, including our own.
* `gulpfile.js` - Defines Gulp task for optimizng images
* `package.json` - Defines depedencies for Gulp/Node
* `package-lock.json` - Defines depedencies for Gulp/Node

### Theme folder

```
/themes/sathyaram
├── css - Holds the compiled CSS after it has been run through Sass, minifier, autoprefixer etc.
├── fonts - Holds font assets for the theme.
├── images - Holds images assets for the theme.
├── js - Holds the compiled JS after it has been run through Uglify.
├── src - Holds the source for both CSS and JavaScript.
├── templates - Holds the templates being defined by this theme.
├── gulpfile.js - Defines Gulp tasks for building the theme's CSS and JavaScript.
├── package.json - Defines depedencies for Gulp/Node
└── package-lock.json - Defines depedencies for Gulp/Node
```

## Developing

### Building the theme's assets

1. Open a terminal at the root of the theme `/themes/sathyaram`
2. Install the Node dependencies for the build process:
    * `> npm install`
3. Make sure you have gulp installed globally:
    * `> npm install -g gulp`

Now you can run any of the gulp commands. To see the available commands, first
run `gulp help`.

```
Available tasks
  build               Builds everything (CSS and JavaScript) [build:css, build:js]
  build:css           Builds all CSS [build:css:full, build:css:critical]
  build:css:critical  Builds critical-path CSS
  build:css:full      Builds full CSS
  build:js            Builds all of the JavaScript [build:js:custom, build:js:vendor]
  build:js:custom     Builds all custom JavaScript
  build:js:vendor     Builds all vendor JavaScript
  default             [build]
  help                Display this help text.
  watch               Watches everything (CSS and JavaScript) for changes and rebuilds [watch:css, watch:js]
  watch:css           Watches SCSS for changes and rebuilds all CSS [watch:css:full, watch:css:critical]
  watch:css:critical  Watches SCSS for changes and rebuilds critical-path CSS
  watch:css:full      Watches SCSS for changes and rebuilds full CSS
  watch:js            Watches all of the JavaScript for changes and rebuilds [watch:js:custom, watch:js:vendor]
  watch:js:custom     Watches custom JavaScript for changes and rebuilds
  watch:js:vendor     Watches vendor JavaScript for changes and rebuilds
```

### Optimizing page's images

1. Open a terminal at the root of the repository.
2. Install the Node dependencies for the optimization process:
    * `> npm install`
3. Make sure you have gulp installed globally:
    * `> npm install -g gulp`
4. Make sure you have GraphicsMagick installed:
    * `> apt-get install graphicsmagick` OR
    * `> brew install graphicsmagick`

Now you can run any of the gulp commands. To see the available commands, first
run `gulp help` (currently only one task: `optimize`).

```
Available tasks
  default   [optimize]
  help      Display this help text.
  optimize  Optimizes/compresses the images
```

## Managing Content

### Photography section

To manage the Photography section, navigate to `/pages/01.home/05._photography`.

In this folder, the `photos.md` defines the configuration info for this section.

Each of the folders contained in this folder are the sub-pages of this one. In
this situation, each sub-page is a category for the Photos.

Each of the category folders contains all images associated with that category.

#### To add a category

Inside the `/pages/01.home/05._photography` directory, create a new folder for
your category. Make sure to abide by the numbering already in place.

Inside your new folder, create a file called `category.md`. The contents of this
file should look like this:

```
---
title: 'A title for this category'
slug: 'a-slug-for-this-category'
description: "A description for this category."
---
```

#### To add a photo

Navigate to the folder for the category you would like to add a photo to.

Place your photo in this folder. It will automatically be detected and displayed
in the correct category on the Photography section.

##### Metadata

To add a title and caption to a photo, you must create a `yaml` configuration
file alongside it in the same folder.

Say for example, the image is called `example.png`. You would create a new file
alongside the image called `example.png.meta.yaml`. The contents of this file
should look like this:

```
title: 'Photo title'
description: "A descripion of the photo."
```
