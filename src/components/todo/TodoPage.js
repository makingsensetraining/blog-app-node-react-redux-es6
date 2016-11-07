import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import ToDoFooter from './TodoFooter';
import * as todoActions from '../../actions/todoActions';
import toastr from 'toastr';

class TodoPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            todo: Object.assign({}, props.todo),
            errors: {},
            saving: false
        };

        this.updateTodoState = this.updateTodoState.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
    }

    saveTodo(event){
        event.preventDefault();
        debugger;

        //ToDo - Check if has some valid title

        this.setState({ saving: true });
        this.props.actions.saveTodo(this.state.todo)
            .then(() => {
                toastr.success('Todo saved successfuly');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
                this.setState({ errors: error });
            });
    }

    updateTodoState(event){
        const field = event.target.name;
        let todo = this.state.todo;
        todo[field] = event.target.value;
        console.log(todo[field]);
        return this.setState({todo: todo});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h1 className="text-center">todos</h1>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <TodoForm
                                todo={this.state.todo}
                                onSave={this.saveTodo}
                                onChange={this.updateTodoState}/>
                        </div>
                        <div className="panel-body">
                            <TodoList todos={this.props.todos}/>
                        </div>
                        <div className="panel-footer">
                            <ToDoFooter/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

TodoPage.propTypes = {
    todo: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {

    let todo = {
        title: ''
    };

    return {
        todo: todo,
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(TodoPage);
