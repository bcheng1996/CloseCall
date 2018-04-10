var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var moment = require('moment');
var Post = require("./models/Post")
var Crash = require("./models/Crash")
var path = require('path')
var convert = require("./convert")
var _ = require('underscore');


dotenv.load();
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));


// Coonect to MongoDB
console.log(process.env.MONGODB);
console.log(moment().format('MMMM Do YYYY, h:mm a'));
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var _DATA = dataUtil.loadData().objects;


/*Home page*/
app.get('/', function(req, res) {
    Crash.find({}, function(err, crashes){
        convert.convert(crashes);
    });
    res.render('home',{

    });

});


app.get('/accidents', function(req,res){
    Crash.find({}, function(err, crash){
        res.render('crash', {
            crash:crash
        });
  });

});


app.get('/csv', function(req,res){
    res.sendFile(path.join(__dirname, 'test.csv'));
});

app.get('/about', function(req,res){
    res.render('about', {

    });
});

app.delete('/delete/user/:user/lat/:lat/long:long/', function(req, res){
    var user = req.params.user;
    var lat = req.params.lat;
    var long = req.params.long;

/*delete user from db*/

});




app.post('/post/user/:user/long/:long/lat/:lat/date/:date', function(req, res){
    var author = req.params.user;
    var long = req.params.long;
    var lat = req.params.lat;
    var time_ = req.params.date;
    var crash = new Crash({
        name: author,
        time: time_,
        long: long,
        lat: lat
    });
    crash.markModified('object');
    crash.save(function(err, data){
        if(err){
            console.log("ERROR");
            console.log(err);
        }else{
        console.log("SAVED");
        Crash.find({}, function(err, crashes){
            convert.convert(crashes);
        });
        return res.json(crash);
    }
    });
});




app.listen(3000, function() {
    console.log('Close Call listening on  3000!');
});
