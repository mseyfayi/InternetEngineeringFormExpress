const createError = require('http-errors');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, `The requested URL "${req.url}" was not found on this server.`));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({message: err.message});

});

module.exports = app;
