#!/bin/bash
set -e

CONFIG_DIR_BASE="/var/www/config"
DEPLOY_USER="deployer"

#DO NOT REMOVE THIS ECHO
echo "Config deploy script"

#If nginx config was updated in the last (and actual) commit
if [ "$(git log -n 1 --pretty=format:%h -- _configs/nginx/)" = "$(git log --pretty=format:'%h' -n 1)" ]; then
        # Push codebase to the servers via rsync.
        echo "last config commit: $(git log -n 1 --pretty=format:%h -- _configs/nginx/) last commit: $(git log --pretty=format:'%h' -n 1)"
        for SERVER in $(egrep -v '(^#|^\s*$|^\s*\t*#)' _scripts/server_list.txt)
        do
                echo "Deploying config on server $SERVER in directory $CONFIG_DIR_BASE"
                #write info about deployment
                printf "#This configuration was deployed on: \n#Server\t\t$SERVER \n#Date\t\t$(date) \n#Commit\t\t$TRAVIS_COMMIT \n#Build\t\t$TRAVIS_BUILD_NUMBER \n\n" > _configs/deploy-info.txt
                
                #Copy nginx configuration to config directory, overwriting 
                scp -r _configs/* $DEPLOY_USER@$SERVER:$CONFIG_DIR_BASE
                
                #safely reload nginx
                ssh -t $DEPLOY_USER@$SERVER 'sudo nginx -s reload' 
                
                #Add to message that will be notified to the slack team
                printf "Successfully deployed config on server $SERVER from commit $TRAVIS_COMMIT. \n\n" >> slack_message.txt
        done
else
        echo "No update to configs, configs not deployed"
        #Add to message that will be notified to the slack team
        printf "No configuration deployment required. \n\n" >> slack_message.txt

fi
