import React, {PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({todos}) => {
    return (
        <div>
            <ul>
                {todos.map((todo, index) =>
                    <Todo
                        key={index}
                        title={todo.title}
                    />
                )}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};

export default TodoList;
