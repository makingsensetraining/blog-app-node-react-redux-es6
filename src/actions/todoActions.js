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
            { title: 'Go to shopping' },
            { title: 'Start Gym' },
            { title: 'Do the homework' },
            { title: 'Learn ReactJS' },
            { title: 'Understand Redux' }
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
