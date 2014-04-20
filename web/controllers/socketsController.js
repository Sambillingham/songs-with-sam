"use strict";
var app = require('../app'),
    piController = require('./piController');

module.exports.init = function(socket){

    app.io.sockets.emit('connection');

    //new track sent from web interface
    socket.on('new-track', piController.newTrack);

    //new user connected, check if pi is running
    socket.on('status-check', piController.status);

    //pi returned current status
    //socket.on('pi-status', piController.status);
};