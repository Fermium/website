#!/bin/bash
set -e

bundle exec htmlproofer ./_site --assume-extension --check-html --disable-external
bundle exec htmlproofer ./_site --external_only
