#!/bin/bash
set -e

nginx -t -c $TRAVIS_BUILD_DIR/_scripts/tests/nginx/test-conf
