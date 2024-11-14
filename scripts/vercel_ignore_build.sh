#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ -z "${VERCEL_GIT_COMMIT_REF}" || "${VERCEL_GIT_COMMIT_REF}" =~ ^(renovate\/.*|dependabot\/.*|.*\.tmp|staging|trying|gtmq_.*)$ ]]; then
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0
else
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1
fi
