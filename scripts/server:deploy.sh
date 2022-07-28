# Deploy Server
cd server

npm run build
pm2 --name Eris_Server start ./dist/main.js
