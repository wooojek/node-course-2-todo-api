// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const URL = require('../.env').URL;

MongoClient.connect(URL, (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert todo', err);
    //    }
    //
    //    console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Mike',
    //     age: 25,
    //     location: 'Poland'
    // }, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert user', err);
    //    }
    //
    //    console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});