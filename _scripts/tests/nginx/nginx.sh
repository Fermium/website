#!/bin/bash
set -e

sudo nginx -t -c $TRAVIS_BUILD_DIR/_scripts/tests/nginx/test-conf
