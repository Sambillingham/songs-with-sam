$(function () {
    'use strict';

    var s,
        app = {

        settings : {
            status: 'offline'
        },
        init : function(){
            s = this.settings;

            this.bindUiActions();
            this.socketConnect();
            this.socketEvents();
            this.scroller();
        },

        bindUiActions : function () {
            var self = this;

            $('.search-btn').on('click', function() {
                self.searchAJAX();
            });

            $(document).keypress(function(e) {
                if(e.which == 13) {
                    self.searchAJAX();
                }
            });

           $('body').on('click', '.send-track', function() {
                var trackUri = $(this).data('track-uri'),
                    urlReady = trackUri.split(':');
                self.socket.emit('new-track', {
                    uri: trackUri
                });
               $('.track-link').attr("href", 'https://play.spotify.com/track/' + urlReady[2]);
                $('html,body').animate({
                    scrollTop: 0
                }, 600,'swing');
                console.log("track sent");
            });
        },

        socketConnect : function(){
            this.socket = io.connect('http://localhost:3000/');
        },

        socketEvents : function() {
            var self = this;

            this.socket.on('update-status', function(data){
                self.displayStatus(data);
            });
        },

        displayStatus: function(data){
            var $track = $('.track-details span'),
                $pi = $('.pi-status');

            console.log(data);
            switch(data.status){

                case 'playing':
                    $('.album-artwork').fadeOut(300, function(){
                        $(this).attr("src", data.meta.artwork).fadeIn(400);
                    });
                    $track.text(data.meta.track + ' - ' + data.meta.artist);
                    s.status = 'playing';
                    $('.pi-status').css('background', '#55C215');
                    break;
                case 'idle':
                    $track.text('Nothing - Play something below');
                    s.status = 'idle';
                    $('.pi-status').css('background', '#15A2C2');
                    break;
                case 'offline':
                    $track.text('Nothing is happening - Pi Player is Offline');
                    s.status = 'offline';
                    $('.pi-status').css('background', '#C23515');
                    break;
            }
        },

        displayTracks: function(data){
            var ammountOfTracks,
                tracks = data.tracks;

            $('.results > ul').empty();
            if( tracks.length > 10 ){
                ammountOfTracks = 10;
            } else {
                ammountOfTracks = tracks.length;
            }

            for (var i = ammountOfTracks - 1; i >= 0; i--) {
                $('<li class="track"><span class="send-track" data-track-uri="'+ tracks[i].href +'"></span><span class="track-info">' + tracks[i].name + ' - '+ tracks[i].artists[0].name + '</li>').hide().appendTo('.results > ul').fadeIn(500);
            }
        },

        searchAJAX : function(){
            var self = this,
            searchParams = encodeURI( $('.search-input').val().trim() );

            $.ajax({
                url: 'https://ws.spotify.com/search/1/track.json?q=' + searchParams,
                type: "GET",
                success: function(data) {
                    self.displayTracks(data);
                }
            });
        },

        autoType: function(){
            setTimeout( function(){

            }, 7000);
        },

        scroller: function(){
            $(".scroll").click(function(event){
                event.preventDefault();

                var dest = 0;
                if ($(this.hash).offset().top > $(document).height()-$(window).height()) {
                    dest = ( $(document).height()-$(window).height() ) - 50 ;
                } else {
                    dest = ($(this.hash).offset().top) - 50;
                }

                $('html,body').animate({
                    scrollTop: dest
                }, 600,'swing');
            });
        }
    };

    app.init();
});
