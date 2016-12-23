(function () {
  'use strict';

  var h264Player = new Player({
    useWorker: true,
    webgl: true, // defaults to "auto"
    size: { width: 720, heigth: 420 },
    workerFile: "/vendor/Broadway/Player/Decoder.js",
  });
  document.getElementById('h264-player').appendChild(h264Player.canvas);

  var streamSocket = new WebSocket('ws://' + window.location.host);
  streamSocket.binaryType = 'arraybuffer';

  var isLiving = false;
  var playLiveEle = document.getElementById('play-live');
  var stopLiveEle = document.getElementById('stop-live');
  playLiveEle.addEventListener('click', function (event) {
    if (isLiving) {
      alert('Has been living now...');
    }
    isLiving = true;
    streamSocket.send(JSON.stringify({ type: 'play-live' }));
  });
  playLiveEle.addEventListener('click', function (event) {
    isLiving = false;
    // uncomment if you hava a live stream on the server side
    // if (isLiving) {
    //   streamSocket.send(JSON.stringify({ type: 'stop-live' }), function (ack) {
    //     console.log(ack);
    //     isLiving = true;
    //     alert('Stop successfully');
    //   });
    // }
  });

  function renderPlayerList(data) {
    var playListEle = document.getElementById('h264-files');
    var listInfos = JSON.parse(data);
    listInfos.forEach(function(info) {
        var li = document.createElement('li');
        li.className += "list-group-item pointer";
        li.appendChild(document.createTextNode('Click to play static file: ' + info.name));
        li.addEventListener('click', function (event) {
          if (isLiving) {
            alert('Please Stop Live Stream First.')
            return;
          }
          streamSocket.send(JSON.stringify({
            type: 'play-file',
            file: info.path,
          }));
        });
        playListEle.appendChild(li);
    });
  }

  streamSocket.onopen = function onOpen() {
    console.log('streamWebSocket has been opened.');
    streamSocket.send(JSON.stringify({
      type: 'get-play-list'
    }));
  };
  streamSocket.onclose = function onClose(event) {
    console.log('streamWebSocket has been closed.', event);
  };
  streamSocket.onmessage = function onMessage(event) {
    if (typeof event.data !== 'string') {
      var frame = new Uint8Array(event.data);
      h264Player.decode(frame);
    } else {
      renderPlayerList(event.data);
    }
  };

})();
