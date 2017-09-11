var express = require("express");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(session({ secret: 'supersecret' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
})

app.post('/survey', function(req, res) {
    req.session.result = req.body;
    res.redirect('/result');
})

app.get('/result', function(req, res) {
    var result = {
        name: req.session.result.name,
        location: req.session.result.location,
        favlang: req.session.result.favlang,
        comment: req.session.result.comment
    };

    res.render("result", { result: result });
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});