var io = require('socket.io-client'),
    socket = io.connect('songswith.sambillingham.com/pi', {
        port: 8083
    });

//modules
var socketController = require('./controllers/socketController');

socket.on('connect', socketController.init );

module.exports.socket = socket;