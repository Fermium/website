#!/bin/bash
set -e

nginx -t -c $TRAVIS_BUILD_DIR/_tests/nginx/test-conf
