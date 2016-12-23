'use strict';

const path = require('path');
const url = require('url');
const server = require('http').createServer();

const express = require('express');
const logger = require('morgan');
const WebSocketServer = require('ws').Server;

const playFile = require('./lib/play-file');

const PORT = 3000;
const SAMPLE_DIR = path.join(__dirname, 'samples');

const app = express();
const wss = new WebSocketServer({ server: server });

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', function onConnection(client) {

  client.on('message', function onMessage(message) {
    message = JSON.parse(message);
    switch(message.type) {
      case 'get-play-list': {
        client.send(JSON.stringify(playFile.getFileListSync(SAMPLE_DIR)));
        break;
      }
      case 'play-file': {
        client.busy = false;
        const playStream = playFile.getFileStream(message.file);
        playStream.on('data', function (data) {
          if (client.busy) return;
          data = Buffer.concat([ Buffer.from([0, 0, 0, 1]), data], 4 + data.length);
          client.send( data, { binary: true }, function ack (err) {
            if (!err) {
              client.busy = false
            }
          });
        });
        break;
      }
      case 'play-live': {
        // TODO: your live stream here
        break;
      }
      case 'stop-live': {
        // TODO: stop your live stream here
        break;
      }
      default: {
        console.error('wrong message type:', message.type);
        break;
      }
    }
  });
});

server.on('request', app);
server.listen(PORT, function () {
  console.log('Listening on', server.address().port);
});
