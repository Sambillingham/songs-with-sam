var app = require('../app'),
    spotifyController = require('./spotifyController'),
    statusController = require('./statusController');

module.exports.init = function(socket) {

    app.socket.on('pi-track', spotifyController.recivedTrack);
};