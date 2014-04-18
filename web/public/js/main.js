$(function () {
    'use strict';

    var s,
        app = {

        settings: {
        },
        init : function(){
            var self = this;

            s = this.settings;
            this.bindUiActions();
            this.socketConnect();
            this.socketEvents();
        },

        bindUiActions : function () {
            var self = this;

            $('.search-btn').on('click', function() {
                var searchParams = encodeURI( $('.search-input').val() );

                $.ajax({
                    url: 'https://ws.spotify.com/search/1/track.json?q=' + searchParams,
                    type: "GET",
                    success: function(data) {
                        self.displayTracks(data);
                    }
                });
            });

            $('.send-track').on('click', function() {
                self.socket.emit('new-track', {
                    uri: 'spotify:track:21OwGeh8c5HUWhJ1TmKDUa'
                });
                console.log("track sent");
            });
        },

        socketConnect : function(){
            this.socket = io.connect();
        },

        socketEvents : function() {
            var self = this;

            this.socket.on('current-status', function(data){
                console.log('Current Status: ', data);
            });
        },

        displayTracks: function(data){
            var ammountOfTracks,
                tracks = data.tracks;                

            console.log(data);
            if( tracks.length > 10 ){
                ammountOfTracks = 10;
            } else {
                ammountOfTracks = tracks.length;
            }

            for (var i = ammountOfTracks - 1; i >= 0; i--) {
                console.log(tracks[i].name);
                $('<li class="track">'+ tracks[i].name + ' - '+ tracks[i].artists[0].name + '</li>').hide().appendTo('.results > ul').fadeIn(500);
            }

        }
    };

    app.init();
});
