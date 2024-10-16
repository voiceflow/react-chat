#!/bin/bash

type=${1}
build_sub_dir=${2}
tsconfig='tsconfig.build.json'
build_dir='build'

shift

if [ -n "${type}" ]; then
  tsconfig="tsconfig.build.${type}.json"

  if [ -n "${build_sub_dir}" ]; then
    shift
    build_dir="${build_dir}/${build_sub_dir}"
  else
    build_dir="${build_dir}/${type}"
  fi
fi

set -e

yarn g:rimraf "${build_dir}"
yarn g:tsc -p "${tsconfig}" --outDir "${build_dir}" "$@"
yarn g:tsc-alias -p "${tsconfig}" --outDir "${build_dir}"

if [ -n "${type}" ]; then
  touch "${build_dir}/package.json"
fi

if [ "${type}" = "esm" ]; then
  echo '{ "type": "module" }' > "${build_dir}/package.json"
elif [ "${type}" = "cjs" ]; then
  echo '{ "type": "commonjs" }' > "${build_dir}/package.json"
fi
