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
    };

module.exports.newTrack = function(data){
    app.io.of('/pi').emit('pi-track', data);
};

module.exports.status = function(data){
    if( data !== undefined){
        piStatus = data;
    }
    app.io.sockets.emit('update-status', piStatus);
};