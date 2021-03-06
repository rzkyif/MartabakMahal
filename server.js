'use strict';
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const express = require('express');
//const ejs = require('ejs');
const mainRoute = require('./routes/main');
const tools = require('./tools');
const database = require('./database');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use('/', mainRoute);
app.set('view engine', 'ejs');

// options

const port = 3000;

// post handling

app.post('/post_login', function (req, res) {
    var result = database.check_password(req.body.username, req.body.password);

    if (result) {
        var payload = {
            username: req.body.username
        };
        res.cookie('data', tools.sign_cookie(payload));
        res.redirect('../');
    } else {
        res.redirect(`../login`);
    }
});

// listen

app.listen(port, () => console.log(`Aplikasi POS 'Martabak Mahal' telah dijalankan pada port ${port}!`));