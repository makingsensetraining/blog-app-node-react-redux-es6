import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoFooter from './TodoFooter';
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

        this.handleUpdateTodoState = this.handleUpdateTodoState.bind(this);
        this.handleSaveTodo = this.handleSaveTodo.bind(this);
    }

    handleSaveTodo(event){
        event.preventDefault();

        console.log(this.state.todo);
        //ToDo - Check if has some valid title

        this.setState({ saving: true });

        this.props.actions.saveTodo(this.state.todo)
            .then(() => {
                toastr.success('Todo saved successfuly');
                this.resetTodo();
            })
            .catch(error => {
                toastr.error(error);
                this.resetTodo();
                this.setState({ errors: error });
            });
    }

    handleUpdateTodoState(event){
        const field = event.target.name;
        let todo = this.state.todo;
        todo[field] = event.target.value;
        return this.setState({todo: todo});
    }

    resetTodo(){
        this.setState({
            saving: false,
            todo: Object.assign({}, this.props.todo) //Todo: research a better way?
        });
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
                                onChange={this.handleUpdateTodoState}
                                onSave={this.handleSaveTodo}
                                error={this.state.errors}
                                saving={this.state.saving}
                            />
                        </div>
                        <div className="panel-body">
                            <TodoList todos={this.props.todos}/>
                        </div>
                        <div className="panel-footer">
                            <TodoFooter todos={this.props.todos}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TodoPage.propTypes = {
    todo: PropTypes.object.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {

    let todo = {
        id: 0,
        title: '',
        completed: false
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
