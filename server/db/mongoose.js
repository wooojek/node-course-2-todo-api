const mongoose = require('mongoose');

// const URL = require('../../.env').URL;
const URL = 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || URL);

module.exports = {
    mongoose
};