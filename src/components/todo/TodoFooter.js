import React, {PropTypes} from 'react';

const TodoFooter = ({todos}) => {
    const quantity = todos.length;
    const completedItems = todos.filter(todo => todo.completed == true).length;
    const pending = quantity - completedItems;

    return (
        <div>
            <div id="info">
                <strong>{quantity}</strong> items on List || Completed: {completedItems} || Active: {pending}
            </div>
            <div id="filters">
                <p> Filters: Completed | Active</p>
            </div>
        </div>
    );
};

TodoFooter.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};

export default TodoFooter;
