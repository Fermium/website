#!/bin/bash
set -e
DEPLOY_DIR_BASE="/var/www/html/"

# Define an array of servers to which the code will be deployed.
#SERVERS="abc.example.com, xyz.example.com"
SERVERS="srv1.web.fermiumlabs.com"

# Push codebase to the servers via rsync.
for SERVER in $SERVERS
do
        # Initialize a new git repo in _site, and push it to our server.
        cd _site
        git init
        git remote add deploy "deployer@$SERVER:$DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
        git config user.name "Travis CI"
        git config user.email "webmaster@fermiumlabs.com"
        git add .
        git commit -m "Deploy"
        git push --force deploy master
done
