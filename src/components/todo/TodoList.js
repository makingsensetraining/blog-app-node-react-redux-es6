import React, {PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({todos}) => {
    return (
        <div>
            <ul>
                {todos.map((todo, index) =>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                    />
                )}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};

export default TodoList;
