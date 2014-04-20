//modules
var app = require('../app');

var piStatus = {
    status : 'offline',
    meta: {
        track : '',
        artist : '',
        artwork : ''
    }
};

module.exports.status = function(status) {
    if(status !== undefined){
        piStatus = status;
    }
    console.log(piStatus);
    app.socket.emit('pi-status', piStatus);
};