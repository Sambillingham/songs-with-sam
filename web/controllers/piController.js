"use strict";
var app = require('../app');

var piStatus = { //'online-playing', 'online-idle', 'offline'
    status : 'offline'
};

module.exports.newTrack = function(data){
    //very uri type using node-spotify-web
    //send error back to web interface if mal formed url
    //or send uri to pi
    app.io.sockets.emit('pi-track', data);
    console.log("new track uri recieved on server: ", data);
};

module.exports.status = function(data){
    app.io.sockets.emit('pi-status', piStatus);
    console.log("Checking Pi Status");
};