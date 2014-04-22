var app = require('../app');

var piStatus = {
    status : 'idle',
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
    app.socket.emit('pi-status', piStatus);
};