import * as types from './actionTypes';
import todoAPI from '../api/mockTodoApi';

export function loadTodoSuccess(todos){
    return { type: types.LOAD_TODO_SUCCESS, todos };
}

export function createTodoSuccess(todo){
    return { type: types.CREATE_TODO_SUCCESS, todo };
}

export function updateCourseSuccess(todo){
    return { type: types.UPDATE_TODO_SUCCESS, todo };
}

export function loadTodos(){
    return function(dispatch){
        return todoAPI.getAllTodos().then(todos => {
            dispatch(loadTodoSuccess(todos));
        }).catch(error => {
            throw(error);
        });
    }
}

export function saveTodo(todo){
    return function(dispatch, getState){
        return todoAPI.saveTodo(todo).then(todoSaved => {
            todo.id ? dispatch(updateCourseSuccess(todoSaved)) :
                dispatch(createTodoSuccess(todoSaved));
        }).catch(error => {
            throw(error);
        });
    };
}
