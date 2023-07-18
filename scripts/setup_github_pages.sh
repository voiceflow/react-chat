#!/bin/bash

set -e

git checkout --orphan pages
git reset .
git add -f packages/react-chat/dist
git add -f packages/widget/dist
cp scripts/template.html index.html
git add index.html
git commit -m "initial" --no-verify
git push
git clean -fd .
