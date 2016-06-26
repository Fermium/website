#!/bin/bash
set -e

echo "#### HTMLproofer test script"

cd $TRAVIS_BUILD_DIR/Websites/ #dir that contains the websites in this repo
#for every directory, max depth 1, clean the output
for WEBSITE in $(find . -maxdepth 1 -type d | tr -d "./") 
do
        WEBSITE_DIR="$TRAVIS_BUILD_DIR/Websites/$WEBSITE"
        cd $WEBSITE_DIR
        
        echo "#### testing website in folder $(pwd)"
        
        #the site directory takes over _site if present.
        if [ -d "$WEBSITE_DIR/site" ]; then
                # Control will enter here if $DIRECTORY exists.
                WEBSITE_DIR=$WEBSITE_DIR/site
                echo "#### directory site present, ignoring _site"
        else
                echo "#### directory site not present, using _site"
                WEBSITE_DIR=$WEBSITE_DIR/_site
        fi 
        
        #check html and stuff
        bundle exec htmlproofer $WEBSITE_DIR --assume-extension --check-html --disable-external
        
        #check external urls, but always exit with a non-error exit code
        bundle exec htmlproofer $WEBSITE_DIR --external_only  || true
done
