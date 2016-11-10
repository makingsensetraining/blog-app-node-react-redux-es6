import React, {PropTypes} from 'react';

class Todo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isChecked: props.completed ? true : false
        };

        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    toggleCheckbox(){
        this.setState({
            isChecked: !this.state.isChecked
        });

        const todo = {
            id: this.props.id,
            title: this.props.title,
            completed: !this.state.isChecked
        };

        this.props.onChange(todo);
    }

    deleteTodo(){
        this.props.onDelete(this.props.id);
    }

    render() {
        let props = this.props;

        const completedClass = props.completed ? 'completed' : '';

        return (
            <li>
                <div className="checkbox">
                    <label className={completedClass}>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={this.state.isChecked}
                            onChange={this.toggleCheckbox}
                            value={props.title}
                        /> {props.title}
                    </label>
                    &nbsp;
                    <a href="#" onClick={this.deleteTodo}><i className="glyphicon glyphicon-trash"> </i></a>
                </div>
            </li>
        );
    }
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Todo;
