var app = require('../app'),
    spotifyController = require('./spotifyController');

module.exports.init = function(socket) {

    app.socket.on('pi-track', spotifyController.recivedTrack);

};