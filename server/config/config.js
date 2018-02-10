const NODE_ENV = process.env.NODE_ENV || 'development';
let ENV = {};
NODE_ENV !== 'production' ? ENV = require('../../.env') : null;

if (NODE_ENV === 'development') {
    process.env.PORT = ENV.PORT;
    process.env.MONGODB_URI = ENV.URL;
} else if (NODE_ENV === 'test') {
    process.env.PORT = ENV.PORT;
    process.env.MONGODB_URI = ENV.TEST_URL;
}