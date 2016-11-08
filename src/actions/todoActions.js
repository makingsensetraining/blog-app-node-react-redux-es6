import * as types from './actionTypes';

export function loadTodoSuccess(todos){
    return { type: types.LOAD_TODO_SUCCESS, todos };
}

export function createTodoSuccess(todo){
    return { type: types.CREATE_TODO_SUCCESS, todo };
}

export function loadTodos(){
    return function(dispatch){
        //ToDo: implement API call to loadTodos
        console.log('adding a todo - API Call'); //ToDo: remove this
        //ToDo: When API Call finished: call the dispatch
        let todos = [ //ToDo: mocking/hardcoding for now the todos
            { id: 1, title: 'Go to shopping', completed: false },
            { id: 2, title: 'Start Gym', completed: false },
            { id: 3, title: 'Do the homework', completed: true },
            { id: 4, title: 'Learn ReactJS', completed: false },
            { id: 5, title: 'Understand Redux', completed: true }
        ];
        dispatch(loadTodoSuccess(todos))
    }
}

export function saveTodo(todo){
    return function(dispatch, getState){
        debugger;
        //ToDo: implement API call to saveTodo
        console.log('adding a todo - API Call'); //ToDo: remove this
        //ToDo: When API Call finished: call the dispatch
        dispatch(createTodoSuccess(todo));
    }
}
