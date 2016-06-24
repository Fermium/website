#!/bin/bash
set -e

DEPLOY_DIR_BASE="/var/www/html"
DEPLOY_USER="deployer"

#DO NOT REMOVE THIS ECHO
echo "Website deploy script"


cd $TRAVIS_BUILD_DIR/Websites/ #dir that contains the websites

#for every directory
for WEBSITE in $(find . -maxdepth 1 -type d) 
do
        DEPLOY_DIR="$DEPLOY_DIR_BASE/$WEBSITE/$TRAVIS_BRANCH"
        cd $TRAVIS_BUILD_DIR/Websites/$WEBSITE
        echo "#### deplying website in folder $(pwd)"

        #For every server
        for SERVER in $(egrep -v '(^#|^\s*$|^\s*\t*#)' $TRAVIS_BUILD_DIR/_scripts/server_list.txt)
        do
                
                # Initialize a new git repo in _site, and push it to our server.
                echo "deploying $WEBSITE on $SERVER:$DEPLOY_DIR"
                cd _site
                #Print deployment report
                printf "This deploy was made on: \nServer\t\t$SERVER \nDate\t\t$(date) \nDirectory\t$DEPLOY_DIR \nCommit\t\t$TRAVIS_COMMIT \nBuild\t\t$TRAVIS_BUILD_NUMBER " > deploy-info.txt
                
                git init
                git remote add $SERVER "$DEPLOY_USER@$SERVER:$DEPLOY_DIR"
                git config user.name "Travis CI"
                git config user.email "webmaster@fermiumlabs.com"
                git add .
                git commit -m "Deploying commit $TRAVIS_COMMIT of repository $TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
                git push --force $SERVER master
                
                printf "Successfully deployed $WEBSITE on server $SERVER in dir $DEPLOY_DIR from commit $TRAVIS_COMMIT. Check out http://$(cat address.txt)/deploy-info.txt\n\n" >> slack_message.txt
                
        done
        cd 
done
