const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove

Todo.findOneAndRemove({_id: '5a7ec859a5c9bcc5fc10e7aa'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5a7ec859a5c9bcc5fc10e7aa').then((todo) => {
    console.log(todo);
});