var lame = require('lame'),
    speaker = require('speaker'),
    Spotify = require('spotify-web');

//modules
var app = require('../app'),
    statusController = require('./statusController'),
    config = require('../config');

module.exports.recivedTrack = function(data){
    console.log("Recived Track: ", data);

    var dataType = Spotify.uriType(data.uri);
    if (dataType != 'track') {
        app.socket.emit('track-error', {
            error : 'Request was not a spotify Track Uri'
        });
    } else {
        Spotify.login(config.credentials.username, config.credentials.password, function (err, spotify) {
          if (err) throw err;

            spotify.get(data.uri, function (err, track) {
                if (err) throw err;
                console.log('Playing: %s - %s', track.artist[0].name, track.name);

                statusController.status({
                    status: 'playing',
                    meta : {
                        track: track.name,
                        artist: track.artist[0].name,
                        artwork: track.album.cover[2].uri
                    }
                });

                track.play()
                    .pipe(new lame.Decoder())
                    .pipe(new speaker())
                    .on('finish', function () {
                        spotify.disconnect();
                        statusController.status({
                            status: 'idle'
                        });

                        console.log("TRACK HAS FINISHED");

                    });
            });
        });
    }
};

