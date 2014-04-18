"use strict";
var piController = require('./piController');

module.exports.init = function(socket){

    //new track sent from web interface
    socket.on('new-track', piController.newTrack);

    //pi returned current status
    socket.on('pi-status', piController.status);
};