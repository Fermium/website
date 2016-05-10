#!/bin/bash
set -e
DEPLOY_DIR_BASE="/var/www/html/"
DEPLOY_USER="deployer"

# Push codebase to the servers via rsync.
for SERVER in $(egrep -v '(^#|^\s*$|^\s*\t*#)' _scripts/server_list.txt)
do
        # Initialize a new git repo in _site, and push it to our server.
        echo "deploying on $SERVER:$DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
        cd _site
        git init
        git remote add deploy "$DEPLOY_USER@$SERVER:$DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
        git config user.name "Travis CI"
        git config user.email "webmaster@fermiumlabs.com"
        git add .
        git commit -m "Deploying commit $TRAVIS_COMMIT of repository $TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
        git push --force deploy master
        slack_message.sh -t "Website deployed" -b "Successfully deployed server $SERVER in dir $DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH from commit $TRAVIS_COMMIT" -c "repositories" -u "$SLACK_WEBHOOK_URL"
done
