"use strict";
var app = require('../app'),
    piController = require('./piController');

module.exports.init = function(socket){

    //new user connected, send pi details to web client
    piController.status();

    //new track sent from web interface
    socket.on('new-track', piController.newTrack);

};

module.exports.pi = function(socket){

    console.log("PI CONNECTED");

    //pi returned current status 'playing' or 'idle'
    socket.on('pi-status', piController.status);

    socket.on('disconnect', function(){ //pi must be 'offline'
        piController.status({status:'offline'});
        console.log("PI disconnect");
    });
};