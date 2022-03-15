sudo systemctl start mongod
cd ../backend
npm start &
cd ../backend_vpn
npm start &
cd ../Starting
node mac_server.js &
npm start
