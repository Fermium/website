<a href="https://fermiumlabs.com/">
    <img src="https://fermiumlabs.com/Assets/img/logos/Horizontal-Main_500px.png" alt="Fermium LABS logo" width="200" align="right" />
</a>

# Website

[![Build Status](https://travis-ci.org/fermiumlabs/website.svg?branch=master)](https://travis-ci.org/fermiumlabs/website) [![Analytics](https://ga-beacon.appspot.com/UA-69533556-3/website/readme/?flat)](https://github.com/igrigorik/ga-beacon)


This repository contains our main website [fermiumlabs.com](https://fermiumlabs.com) as well as the Nginx configuration.

The website is automatically built, tested and deployed from Travis-CI to a list of servers.

You're free to use our scripts for your website, but not our content.

### Automated testing

Each website is automatically tested with HTML proofer before deployment. If only one fails, the whole build will fail.

The tests are:

1. HTMLproof validates the HTML
2. HTMLproof validates external urls

You can add the *data-proofer-ignore* tag to elements you want to ignore:

```html
<a href="http://notareallink" data-proofer-ignore>Not checked.</a>
```


### Git Endpoint

The Git endpoint were the sites are deployed can be set up manually following this [article](http://nicolasgallagher.com/simple-git-deployment-strategy-for-static-sites/).

### CDN

We use [Cloudflare](cloudflare.com) as a CDN, with end-to-end encryption of both request (Authenticated Origin Pulls) and replies (SSL). Visitors data is thus encrypted both way to our servers.

Cloudflare must be set up with full (strict) SSL and appropriated origin certificates.

To replicate our configuration, you need to setup Cloudflare (and enable http proxy):

* @ record
* www
* staging.

For *staging* set up a page rule to bypass most Cloudflare bells and whistles:

* Server Side Excludes **OFF**
* SSL **Strict**
* Smart Errors **OFF**
* Always Online **OFF**
* Cache Level **Bypass**
* Email Obfuscation **OFF**
* Disable Apps
* Disable Performance


### Server folder structure
```
var/www:
├── certificates
│   ├── cloudflare_fermiumlabs_com-key.pem
│   ├── cloudflare_fermiumlabs_com.pem
│   └── origin-pull-ca.pem
├── config
│   ├── deploy-info.txt
│   └── nginx
│       └── sites-enabled
│           ├── catch-all
│           ├── fermiumlabs_com
│           └── staging_fermiumlabs_com
├── git
│   └── fermiumlabs_com
│       ├── develop
│       │   └── hooks
│       │       └── post-receive
│       └── master
│           └── hooks
│               └── post-receive
└── html
      └── fermiumlabs_com
          ├── develop
          │   └── index.html
          └── master
              └── index.html
```
### Repository folder structure

* *_configs:* Nginx configuration
* *_scripts:* All scripts to build, deploy and tests as well as the list of servers to deploy to
* *Websites:* The websites, each in a separate directory like example_com
  * *_site:* The output directory for Jekyll.
  * *site:* The directory if the site is not built by Travis-CI. If this directory is present *_site* will be ignored.


### Dependencies

This website in order to be built and deployed uses a mix of Ruby and Node.js packages.
A global Ruby Gemfile in the root directory includes the other.
The Packages.json file (Node.js) is custom for every website.

The website is built using Jekyll

```bash
bundle install
#example for main site
( cd Websites/fermiumlabs_com && npm install )
```

### Config deployment

The configuration is automatically deployed on the master branch when the files are modified. This for some reason does not work when performing a merge

## Opengraph and social networks compatibility

This website follows the [Opengraph](http://ogp.me/) specifications, including those from:

* [Facebook](https://developers.facebook.com/docs/sharing/opengraph)
* [Twitter](https://dev.twitter.com/cards/markup)
* [Google plus](https://developers.google.com/+/web/snippet/)

## Theme -- READ CAREFULLY IF FORKING

This website is based on a commercial template: [Foundry](http://foundry.mediumra.re).
You MUST buy it if you're using the graphic layout. It's cheap, and great.

## License

Don't copy our graphics, theme or content, they're copyrighted. Although we probably will not notice, the internet is a big place. Unless you're a competitor of us, then we will.


You can use the technical stuff under the  [MIT](https://opensource.org/licenses/MIT) license.

---

<a href="https://twitter.com/intent/user?screen_name=fermiumlabs">
    <img src="https://img.shields.io/twitter/follow/fermiumlabs.svg?style=social&label=Follow" alt="Follow Fermium LABS on Twitter" align="right" />
</a>
