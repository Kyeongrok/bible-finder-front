git pull
yarn run build
sudo rm -Rf /usr/share/nginx/html/*
sudo cp -R ~/git/nodejs/bible-finder-front/build/* /usr/share/nginx/html/
