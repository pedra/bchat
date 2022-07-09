const { PeerServer } = require('peer');
const fs = require('fs');
var crypto = require("crypto");

const customGenerationFunction = () => crypto.randomBytes(20).toString('hex');

const options = {
key: fs.readFileSync('./certificate.key'),
cert: fs.readFileSync('./certificate.crt')
};

const peerServer = PeerServer({
port: 443,
path: '/peerjs/myapp',
generateClientId: customGenerationFunction,
ssl: options,
});