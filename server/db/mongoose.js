const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(URL, {useMongoClient: true});

module.exports = {
    mongoose
};