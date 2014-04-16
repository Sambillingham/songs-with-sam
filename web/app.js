var express = require('express'),
    morgan = require('morgan'),
    jade = require('jade');
    routes = require('./routes'),
    app = express();

var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('server started on 3000');

routes.init(app);