const mongoose = require('mongoose');

const URL = require('../../.env').URL;

mongoose.Promise = global.Promise;
mongoose.connect(URL);

module.exports = {
    mongoose
};