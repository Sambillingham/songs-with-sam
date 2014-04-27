songs-with-sam
==============

##web setup

###Dev
```Shell
npm install
cd sass/ && bourbon install
gulp
```

###Run

Check ports for local sockets in app.js/main.js
```Shell
npm install
node app.js
```

##PI setup

You will need a device password if you do not have a legacy account. Note logging in with username and password will not work. Visit [https://www.spotify.com/account/set-device-password/](https://www.spotify.com/account/set-device-password/) to create a device user/pass. Enter the details in config.example.js and rename it to config.js.

```Javascript
module.exports.credentials = {
    username: 'your-device-username',
    password: 'your-device-password'
}
```
###Setup audio for Rasp Pi

you will need to install these packages from apt-get for audio/this to work.

```Shell
sudo apt-get install alsa-utils // for audio on pi
sudo apt-get install libasound2-dev // so node-speaker can work with pi
```

To test your audio is working try
```Shell
sudo modprobe snd_bcm2835 // installs some drivers
sudo amixer cset numid=3 1 / /sets audio output specifically to analogue
sudo wget http://www.freespecialeffects.co.uk/soundfx/sirens/police_s.wav //get a .wav file
sudo aplay police_s.wav // play song
```

You can set the audio volume via the command line, have a sound file playing so you can hear it changing.

```Shell
amixer cset numid=1 -- 80% // use ranges from > 50%  to < 100 i found outside of that range it just cuts all volume.
```

### Run the thing
```Shell
npm install
node app.js
```