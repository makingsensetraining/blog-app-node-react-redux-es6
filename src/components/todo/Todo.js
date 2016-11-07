import React, {PropTypes} from 'react';

const Todo = (props) => {
    return (
        <li>{props.title}</li>
    );
};

Todo.propTypes = {
    title: PropTypes.string.isRequired
};

export default Todo;
