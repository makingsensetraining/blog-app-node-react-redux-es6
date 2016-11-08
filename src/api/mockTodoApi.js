import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const todos = [
    { id: 1, title: 'Go to shopping', completed: false },
    { id: 2, title: 'Start Gym', completed: false },
    { id: 3, title: 'Do the homework', completed: true },
    { id: 4, title: 'Learn ReactJS', completed: false },
    { id: 5, title: 'Understand Redux', completed: true }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateNextId = (todos) => {
    let lastId = 0;
    todos.map(todo => {
        if (todo.id > lastId) {
            lastId = todo.id
        }
    });

    return ++lastId;
};

class TodoApi {
    static getAllTodos() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], todos));
            }, delay);
        });
    }

    static saveTodo(todo) {
        todo = Object.assign({}, todo); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minTodoTitleLength = 3;
                if (todo.title.length < minTodoTitleLength) {
                    reject(`Title must be at least ${minTodoTitleLength} characters.`);
                }

                if (todo.id) {
                    const existingTodoIndex = todos.findIndex(a => a.id == todo.id);
                    todos.splice(existingTodoIndex, 1, todo);
                } else {
                    //Just simulating creation here.
                    //Cloning so copy returned is passed by value rather than by reference.
                    todo.id = generateNextId(todos);
                    todos.push(todo);
                }

                resolve(todo);
            }, delay);
        });
    }

    static deleteTodo(todoId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfTodoToDelete = todos.findIndex(todo => {
                    todo.id == todoId;
                });
                todos.splice(indexOfTodoToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default TodoApi;
