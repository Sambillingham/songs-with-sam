var io = require('socket.io-client'),
    socket = io.connect('localhost/pi', {
        port: 3000
    });

//modules
var socketController = require('./controllers/socketController');

socket.on('connect', socketController.init );

module.exports.socket = socket;