#! /bin/sh

here=$(cd `dirname $0` && pwd)
root="${here}/.."

cd "${root}"

mkdir -p dist &&
rsync -aH src/js/ dist/ &&
grunt
