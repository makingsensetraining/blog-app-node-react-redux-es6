import React, {PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({todos, onChange}) => {
    return (
        <div>
            <ul className="todo-list">
                {todos.map((todo) =>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onChange={onChange}
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
    }).isRequired).isRequired,
    onChange: PropTypes.func.isRequired
};

export default TodoList;
