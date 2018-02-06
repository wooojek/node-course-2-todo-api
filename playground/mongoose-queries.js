const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// const id = '5a79a05455045b80063acf88';
//
// if (!ObjectId.isValid(id)) {
//     return console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log('Not found');
//     }
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((err) => console.log(err));

User.findById('5a797f822897fb65038f2552').then((user) => {
    if (!user) {
        return console.log('ID not found');
    }

    console.log('user', user);
}, (err) => console.log(err));