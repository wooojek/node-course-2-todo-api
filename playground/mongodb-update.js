const { MongoClient, ObjectID } = require('mongodb');

const URL = require('../.env').URL;

MongoClient.connect(URL, (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5a78c6ba7ffc1ec8fb07e42e")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then(result => console.log(result), err => console.log(err));

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a78bcd55d3eb008d711e05d")
    }, {
        $set: {
            name: 'Mike'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(result => console.log(result), err => console.log(err));

    // db.close();
});