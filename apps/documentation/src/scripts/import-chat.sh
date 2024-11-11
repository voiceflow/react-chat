#!/bin/bash

# Build chat package
cd ../../packages/chat
yarn install
yarn build

# Copy bundled files
mkdir ../../apps/documentation/public/bundle
cp ./dist/bundle.mjs ../../apps/documentation/public/bundle/bundle.mjs
cp ./dist/style.css ../../apps/documentation/public/bundle/style.css

# Go back to previous working directory
cd ../../packages/chat
