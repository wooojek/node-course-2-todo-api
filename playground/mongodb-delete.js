const { MongoClient, ObjectID } = require('mongodb');

const URL = require('../.env').URL;

MongoClient.connect(URL, (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => console.log(result), err => console.log(err));

    // db.collection('Users').findOneAndDelete({_id: new ObjectID('5a78be7580971308f60b428b')}).then((result) => console.log(result), (err) => console.log(err));

    db.collection('Users').deleteMany({name: 'Mike'}).then((result) => console.log(result), (err) => console.log(err));

    // db.close();
});