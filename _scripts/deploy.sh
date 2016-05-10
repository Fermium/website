#!/bin/bash
set -e
DEPLOY_DIR_BASE="/var/www/html/"

# Push codebase to the servers via rsync.
for SERVER in $(cat server_list.txt)
do
        # Initialize a new git repo in _site, and push it to our server.
        echo "deploying on $SERVER:$DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
        cd _site
        git init
        git remote add deploy "deployer@$SERVER:$DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
        git config user.name "Travis CI"
        git config user.email "webmaster@fermiumlabs.com"
        git add .
        git commit -m "Deploy"
        git push --force deploy master
        slack_message.sh -t "Website deployed" -b "Server $SERVER in dir $DEPLOY_DIR_BASE$TRAVIS_REPO_SLUG/$TRAVIS_BRANCH " -c "repositories" -u "$SLACK_WEBHOOK_URL"
done
