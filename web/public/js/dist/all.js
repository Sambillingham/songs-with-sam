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

            this.socket.on('current-status', function(){
                console.log('pong');
            });
        }
    };

    app.init();
});