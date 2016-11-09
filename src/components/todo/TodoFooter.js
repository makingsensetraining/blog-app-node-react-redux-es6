import React, {PropTypes} from 'react';

const TodoFooter = ({todos}) => {
    const quantity = todos.length;
    const completedItems = todos.filter(todo => todo.completed == true).length;
    const pending = quantity - completedItems;

    return (
        <div className="clearfix">
            <div id="info">
                <strong>{quantity}</strong> items on List || Completed: {completedItems} || Active: {pending}
            </div>
            <div id="filters" className="pull-right">
                <button className="btn btn-default">
                    All
                </button>
                &nbsp;
                <button className="btn btn-default">
                    Active
                </button>
                &nbsp;
                <button className="btn btn-default">
                    Completed
                </button>
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
