"use strict";
var app = require('../app'),
    piController = require('./piController');

var piStatus = { //'playing', 'idle', 'offline'
        status : 'offline',
        meta: {
            track : '',
            artist : '',
            artwork : ''
        }
    },
    piOnline = false;

module.exports.newTrack = function(data){
    //very uri type using node-spotify-web
    //send error back to web interface if mal formed url
    //or send uri to pi
    app.io.sockets.emit('pi-track', data);
    console.log("new track uri recieved on server: ", data);
};

module.exports.setStatus = function(data){
    piStatus = data;
    piOnline = true;
    app.io.sockets.emit('update-status', piStatus);
    console.log("Status set to:", piStatus);
};

module.exports.status = function(data){
    app.io.sockets.emit('pi-status', piStatus);
    console.log("Checking Pi Status", piStatus);
};

module.exports.testStatus = function(data){
    piOnline = false;
    app.io.sockets.emit('test-status');
    var timer = setTimeout( function(){
        console.log("pi is,", piOnline);
        if(piOnline === false){
            piController.setStatus({
                status: 'offline'
            });
        }
    }, 3000);

};