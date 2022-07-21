#!c:/Program Files/Git/bin/sh.exe


set -e # abort on errors

npm run build

cd dist # navigate into the build output directory

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
#git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:romansj/AirSendVue.git master:gh-pages

cd -