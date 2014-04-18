"use strict";
var app = require('../app');

module.exports.newTrack = function(data){
    //very uri type using node-spotify-web
    //send error back to web interface if mal formed url
    //or send uri to pi
    app.io.sockets.emit('pi-track', data);
    console.log("new track uri recieved on server: ", data);
};

module.exports.status = function(data){
    //returns what song is currently playing and who request it
    app.io.sockets.emit('current-status', data);
};