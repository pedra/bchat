// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const { ExpressPeerServer } = require("peer");
var crypto = require("crypto");

const customGenerationFunction = () => crypto.randomBytes(20).toString('hex');
//const fs = require('fs');
// const options = {
// key: fs.readFileSync('./certificate.key'),
// cert: fs.readFileSync('./certificate.crt')
// };

const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Url to connect to another user (ex.: http://localhost:3000/id/<another user id>)
app.get("/id/:id", (req, res) => {
  res.send(req.params.id);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


// peerjs server
const peerServer = ExpressPeerServer(listener, {
  debug: true,
  path: '/',
  generateClientId: customGenerationFunction,
//ssl: options,
});

app.use('/app', peerServer);