var app = require('../app'),
    spotifyController = require('./spotifyController'),
    statusController = require('./statusController');

module.exports.init = function(socket) {
    statusController.status();
    app.socket.on('pi-track', spotifyController.recivedTrack);
    app.socket.on('test-status', statusController.status({
        status: 'idle'
    }));
    app.socket.on('connection', statusController.status({
        status: 'idle'
    }));
};