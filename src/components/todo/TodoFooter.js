import React, {PropTypes} from 'react';

const TodoFooter = ({todos, filter, filterFunc}) => {
    const quantity = todos.length;
    const completedItems = todos.filter(todo => todo.completed == true).length;
    const pending = quantity - completedItems;

    let all = false,
        active = false,
        completed = false;

    switch (filter){
        case 'ACTIVE':
            active = true;
            break;
        case 'COMPLETED':
            completed = true;
            break;
        case 'ALL':
        default:
            all = true;
    }

    var localFilterAll = function(){
        filterFunc('ALL');
    };

    var localFilterActive = function(){
        filterFunc('ACTIVE');
    };

    var localFilterComplete = function(){
        filterFunc('COMPLETED');
    };

    return (
        <div className="clearfix">
            <div id="info">
                <strong>{quantity}</strong> items on List || Completed: {completedItems} || Active: {pending}
            </div>
            <div id="filters" className="pull-right">
                <button
                    className="btn btn-default"
                    disabled={all}
                    onClick={localFilterAll}>
                    All
                </button>
                &nbsp;
                <button
                    className="btn btn-default"
                    disabled={active}
                    onClick={localFilterActive}>
                    Active
                </button>
                &nbsp;
                <button
                    className="btn btn-default"
                    disabled={completed}
                    onClick={localFilterComplete}>
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
    }).isRequired).isRequired,
    filter: PropTypes.string.isRequired,
    filterFunc: PropTypes.func.isRequired
};

export default TodoFooter;
