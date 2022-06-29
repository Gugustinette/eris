# Deploy Server
cd server

pm2 --name Eris_Server start npm -- run build
