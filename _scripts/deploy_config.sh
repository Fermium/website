#!/bin/bash
set -e

CONFIG_DIR_BASE="/var/www/config"
DEPLOY_USER="deployer"

#If nginx config was updated in the last (and actual) commit
if [ "$(git log -n 1 --pretty=format:%h -- _configs/nginx/) " = "$(git log --pretty=format:'%h' -n 1)" ]; then
        # Push codebase to the servers via rsync.
        for SERVER in $(egrep -v '(^#|^\s*$|^\s*\t*#)' _scripts/server_list.txt)
        do
                echo match
                
                #write info about deployment
                printf "#This configuration was deployed on: \n#Server\t\t$SERVER \n#Date\t\t$(date) \n#Commit\t\t$TRAVIS_COMMIT \n#Build\t\t$TRAVIS_BUILD_NUMBER " > _configs/deploy-info.txt
                
                #Copy nginx configuration to config directory, overwriting 
                scp -r _configs/* $DEPLOY_USER@$SERVER:$CONFIG_DIR_BASE
                
                #safely reload nginx
                ssh -t $DEPLOY_USER@$SERVER 'sudo nginx -s reload' 
                
                slack_message.sh -t "Config deployed" -b "Successfully deployed config on server $SERVER from commit $TRAVIS_COMMIT." -c "repositories" -u "$SLACK_WEBHOOK_URL"
        done
fi
