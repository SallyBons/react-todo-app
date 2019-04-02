import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import guid from '../utils';

class Form extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    todo: ''
  }

  handleChangeInput = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault();

    const {onSubmit} = this.props;
    const {todo} = this.state;
    const result = {
      id: guid(),
      todo,
      isCompleted: false,
      isImportant: false
    };


    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = [result].concat(todos);

    localStorage.setItem('todos', JSON.stringify(todos));

    onSubmit(todos);
    this.setState({todo: ''});
  }

  render() {
    const {todo} = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <p className="new-task">New task</p>
        <textarea
          value={todo}
          type="text"
          name="todo"
          maxLength="120"
          onChange={this.handleChangeInput}
          className="form-input"
        />
        <div className="btn-wrapper">
          <button className="add-btn" type="submit" disabled={todo.length === 0}>Add</button>
        </div>
      </form>
    );
  }
}

export default Form;
