import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function todoReducer(state = initialState.todos, action){
    switch (action.type){
        case types.LOAD_TODO_SUCCESS:
            console.log('loading todos - Object-Reducer'); //ToDo: remove this
            return action.todos;

        case types.CREATE_TODO_SUCCESS:
            debugger;
            console.log('adding a todo - Object-Reducer'); //ToDo: remove this
            return [
                ...state,
                Object.assign({}, action.todo)
            ];

        default:
            return state;
    }
}
