#!/bin/bash
set -e

DEPLOY_DIR_BASE="/var/www/git"
DEPLOY_USER="deployer"

#DO NOT REMOVE THIS ECHO
echo "#### Website deploy script"


cd $TRAVIS_BUILD_DIR/Websites/ #dir that contains the websites in this repo

#for every directory, max depth 1, clean the output
for WEBSITE in $(find . -maxdepth 1 -type d | tr -d "./") 
do
        DEPLOY_DIR="$DEPLOY_DIR_BASE/$WEBSITE/$TRAVIS_BRANCH"
        WEBSITE_DIR="$TRAVIS_BUILD_DIR/Websites/$WEBSITE"
        
        
        cd $WEBSITE_DIR
        #replacing "_" with "." in directory name to obtain web address 
        WEBSITE_ADDR="$(echo "$WEBSITE_DIR" | sed 's@.*/@@' | tr -s '_' '.')"

        echo "#### deploying website $WEBSITE_ADDR in folder $(pwd)"
        
        #For every server, ignore #comments
        for SERVER in $(egrep -v '(^#|^\s*$|^\s*\t*#)' $TRAVIS_BUILD_DIR/_scripts/server_list.txt)
        do
                
                echo "#### deploying $WEBSITE_ADDR on $SERVER:$DEPLOY_DIR"
                
                #the site directory takes over _site if present.
                if [ -d "$WEBSITE_DIR/site" ]; then
                        WEBSITE_DIR=$WEBSITE_DIR/site
                        echo "#### directory site present, ignoring _site"
                else
                        echo "#### directory site not present, using _site"
                        WEBSITE_DIR=$WEBSITE_DIR/_site
                fi 
                cd $WEBSITE_DIR
                
                
                #Print deployment report
                printf "This deploy was made on: \n\nServer \t\t $SERVER \nWebsite \t $WEBSITE_ADDR \nDate \t\t $(date) \nDirectory \t $DEPLOY_DIR \nCommit \t\t $TRAVIS_COMMIT \nBuild \t\t $TRAVIS_BUILD_NUMBER " > deploy-info.txt
                
                #push the repository
                git init
                git remote add $SERVER "$DEPLOY_USER@$SERVER:$DEPLOY_DIR"
                git config user.name "Travis CI"
                git config user.email "deployer@fermiumlabs.com"
                git add --all .
                git commit -m "Deploying commit $TRAVIS_COMMIT of repository $TRAVIS_REPO_SLUG/$TRAVIS_BRANCH"
                git push --force $SERVER master
                
                #purge cache on master
                test $TRAVIS_BRANCH == "master" && cfcli purgecache
                
                # concat a slack message report for our team
                printf "Successfully deployed $WEBSITE on server $SERVER in dir $DEPLOY_DIR from commit $TRAVIS_COMMIT. Check out http://$(test $TRAVIS_BRANCH == "master" && echo "staging.")$WEBSITE_ADDR/deploy-info.txt\n\n" >> $TRAVIS_BUILD_DIR/slack_message.txt
                
        done 
done
