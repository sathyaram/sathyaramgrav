# SathyaRam.com Website

## Configuration/Setup

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

