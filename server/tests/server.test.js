const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [{
    _id: new ObjectId(),
   text: 'First test todo'
}, {
    _id: new ObjectId(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos).then(() => done());
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
       let text = 'Test todo text';

       request(app)
           .post('/todos')
           .send({ text })
           .expect(200)
           .expect((res) => {
               expect(res.body.text).toBe(text);
           })
           .end((err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.find({text}).then((todos) => {
                  expect(todos.length).toBe(1);
                  expect(todos[0].text).toBe(text);
                  done();
              }).catch(err => done(err));
           });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);

                    done();
                }).catch(err => done(err));
            });
    });
});

describe('GET /todos route', () => {
    it('should GET all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectId().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });

});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();

                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectId().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {

        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexId = todos[0]._id.toHexString();

        let updatedTodo = {
            text: 'Test check',
            asd: 'Test check for uncommon property',
            completed: true
        };

        request(app)
            .patch(`/todos/${hexId}`)
            .send(updatedTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(updatedTodo.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
                expect(res.body.todo.asd).toNotExist();
            })
            // .end((err, res) => {
            //     if (err) {
            //         return done(err);
            //     }
            //
            //     Todo.findById(hexId).then((todo) => {
            //         expect(todo.text).toBe(updatedTodo.text);
            //         expect(todo.completed).toBe(updatedTodo.completed);
            //         expect(todo.completedAt).toBeA('number');
            //
            //         done();
            //     }).catch((err) => done(err));
            // });
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();

        let updatedTodo = {
            text: 'Test check2',
            completed: false
        };

        request(app)
            .patch(`/todos/${hexId}`)
            .send(updatedTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(updatedTodo.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            // .end((err, res) => {
            //     if (err) {
            //         return done(err);
            //     }
            //
            //     Todo.findById(hexId).then((todo) => {
            //         expect(todo.text).toBe(updatedTodo.text);
            //         expect(todo.completed).toBe(updatedTodo.completed);
            //         expect(todo.completedAt).toNotExist();
            //
            //         done();
            //     }).catch((err) => done(err));
            // });
            .end(done);
    });
});