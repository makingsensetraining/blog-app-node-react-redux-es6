import React, {PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({todos, onChange, onDelete}) => {
    let todosView = <p>Sorry, there are no todos to show. You can try to add one.</p>;
    if (todos.length > 0) {
        todosView = todos.map((todo) =>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onChange={onChange}
                            onDelete={onDelete}
                        />
                    );
    }
    return (
        <div>
            <ul className="todo-list">
                {todosView}
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
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TodoList;
