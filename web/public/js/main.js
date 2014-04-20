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
                var searchParams = encodeURI( $('.search-input').val().trim() );

                $.ajax({
                    url: 'https://ws.spotify.com/search/1/track.json?q=' + searchParams,
                    type: "GET",
                    success: function(data) {
                        self.displayTracks(data);
                    }
                });
            });

           $('body').on('click', '.send-track', function() {
                self.socket.emit('new-track', {
                    uri: $(this).data('track-uri')
                });
                console.log("track sent");
            });
        },

        socketConnect : function(){
            this.socket = io.connect('http://localhost:3000/');
        },

        socketEvents : function() {
            var self = this;

            this.socket.on('connection', function(){
                console.log("new connection, check status of pi");
                self.socket.emit('status-check');

            });

            this.socket.on('pi-status', function(data){

                console.log('Current Status: ', data);
                self.displayStatus(data);
            });
        },

        displayStatus: function(data){
            var $pi = $('.pi-status');

            console.log(data.status);
            switch(data.status){

                case 'online-playing':
                    $pi.text('Online - Playing');
                    break;
                case 'online-idle':
                    $pi.text('Online - Idle');
                    break;
                case 'offline':
                    $pi.text('Offline');
                    break;
            }
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
                $('<li class="track"><button class="send-track" data-track-uri="'+ tracks[i].href +'">Play Track</button>' + tracks[i].name + ' - '+ tracks[i].artists[0].name + '</li>').hide().appendTo('.results > ul').fadeIn(500);
            }

        }
    };

    app.init();
});
