import Peer from 'simple-peer';
const getUserMedia = require('getusermedia');

getUserMedia({ video: true, audio: true }, function(err, stream) {
  if (err) return console.error(err);

  const peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream,
  });

  peer.on('signal', function(data) {
    document.getElementById('yourId').value = JSON.stringify(data);
  });

  document.getElementById('connect').addEventListener('click', function() {
    const otherId = JSON.parse(document.getElementById('otherId').value);
    peer.signal(otherId);
  });

  document.getElementById('send').addEventListener('click', function() {
    const yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
  });

  peer.on('data', function(data) {
    document.getElementById('messages').textContent += data + '\n';
  });

  peer.on('stream', function(stream) {
    const video = document.createElement('video');
    document.body.appendChild(video);

    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
});
