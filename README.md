[![Build Status](https://travis-ci.org/fermiumlabs/website.svg?branch=master)](https://travis-ci.org/fermiumlabs/website)

This repository contains the main website [fermiumlabs.com](https://fermiumlabs.com), the website [measuretocome.com](https://measuretocome.com) as well as the Nginx configuration.

The website is automatically built, tested and deployed from Travis-CI to a list of servers.

You're free to use our scripts for your website, but not our content.

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
              
### Repository folder structure

* *_configs:* Nginx configuration
* *_scripts:* All scripts to build, deploy and tests as well as the list of servers to deploy to
* *Websites:* The websites, each in a separate directory like example_com 
  * *_site:* The output directory for Jekyll.
  * *site:* The directory if the site is not built by Travis-CI. If this directory is present *_site* will be ignored.
              
### Thanks
This site was derived from [ionic-site](https://github.com/driftyco/ionic-site).

### TODOs

* Better licensing
