const mongoose = require('mongoose');

const URL = require('../../.env').URL;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || URL);

module.exports = {
    mongoose
};