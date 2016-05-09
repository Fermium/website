#!/bin/bash
# Usage: slackpost <channel> <message>
#SET "SLACK_WEBHOOK_URL" VARIABLE GLOBALLY!

channel=$1
if [[ $channel == "" ]]
then
        echo "No channel specified"
        exit 1
fi

shift

text=$*

if [[ $text == "" ]]
then
        echo "No text specified"
        exit 1
fi

escapedText=$(echo $text | sed 's/"/\"/g' | sed "s/'/\'/g" )
json="{\"channel\": \"#$channel\", \"text\": \"$escapedText\"}"

curl -s -d "payload=$json" "$SLACK_WEBHOOK_URL"
