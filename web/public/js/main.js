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

                if(s.status !== 'playing'){
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
                } else {
                    $('<div class="messages error"><p>Yo nobody likes that person who skips tracks, wait until it\'s finished.</p></div>').prependTo('.search');
                    setTimeout( function(){
                        $('.messages').fadeOut(600, function(){
                            $(this).remove();
                        });
                    }, 7000);
                }
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
                    $('.album-artwork').transition({
                        perspective: '400px', rotateY: '-120deg', opacity: 0, duration: 1000
                    },
                    function(){
                        $(this).remove();
                        $('<img src="'+data.meta.artwork+'" class="album-artwork">').css({
                            'opacity' : '0', "transform" : "rotateY(120deg);"
                        }).appendTo('.track-link').transition({
                            perspective: '400px', rotateY: '0deg', opacity: 1, duration: 1000
                        });
                    });
                    $track.text(data.meta.track + ' - ' + data.meta.artist);
                    s.status = 'playing';
                    $('.pi-status').css('background', '#55C215');
                    break;
                case 'idle':
                    $('.album-artwork').transition({
                        perspective: '400px', rotateY: '-120deg', opacity: 0, duration: 1000
                    },
                    function(){
                        $(this).remove();
                        $('<img src="/img/album-placeholder.png" class="album-artwork">').css({
                            'opacity' : '0', "transform" : "rotateY(120deg);"
                        }).appendTo('.track-link').transition({
                            perspective: '400px', rotateY: '0deg', opacity: 1, duration: 1000
                        });
                    });
                    $track.text('Nothing - Play something below');
                    s.status = 'idle';
                    $('.pi-status').css('background', '#15A2C2');
                    break;
                case 'offline':
                    $('.album-artwork').transition({
                        perspective: '400px', rotateY: '-120deg', opacity: 0, duration: 1000
                    },
                    function(){
                        $(this).remove();
                        $('<img src="/img/album-placeholder.png" class="album-artwork">').css({
                            'opacity' : '0', "transform" : "rotateY(120deg);"
                        }).appendTo('.track-link').transition({
                            perspective: '400px', rotateY: '0deg', opacity: 1, duration: 1000
                        });
                    });
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
                    if(data.tracks.length <= 0){
                        $('<div class="messages error"><p>Looks like I can\'t find anything with that search request. It might be your spelling is as bad as mine or Spotify does not have the obscure trance tune you\'re looking for. Try again.</p></div>').prependTo('.search');
                        setTimeout( function(){
                            $('.messages').fadeOut(600, function(){
                                $(this).remove();
                            });
                        }, 8500);
                    } else {
                        self.displayTracks(data);
                    }
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
