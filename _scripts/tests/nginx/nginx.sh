#!/bin/bash
set -e

cp $TRAVIS_BUILD_DIR/_scripts/tests/nginx/test-conf /etc/nginx/conf.d/
sudo nginx -t 
