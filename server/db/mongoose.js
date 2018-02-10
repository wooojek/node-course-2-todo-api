const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI || require('../../.env').URL;

mongoose.Promise = global.Promise;
mongoose.connect(URL);

module.exports = {
    mongoose
};