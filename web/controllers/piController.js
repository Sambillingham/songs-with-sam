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
    if( data !== undefined){
        piStatus = data;
    }
    piOnline = true;
    app.io.sockets.emit('update-status', piStatus);
};

module.exports.status = function(data){
    app.io.sockets.emit('pi-status', piStatus);
};

module.exports.testStatus = function(data){
    if(piStatus.status !== 'playing') {
        piOnline = false;
        app.io.sockets.emit('test-status');
        var timer = setTimeout( function(){
            if(piOnline === false){
                piController.setStatus({
                    status: 'offline'
                });
            } else {
                // piController.setStatus({
                //     status: 'idle'
                // });
            }

        }, 10000);
    }
};