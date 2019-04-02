import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class TodoItem extends React.PureComponent {
  static propTypes = {
    todo: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isImportant: PropTypes.bool.isRequired,
    toggleDeleteButton: PropTypes.func.isRequired,
    toggleCompletition: PropTypes.func.isRequired,
    toggleImportant: PropTypes.func.isRequired
  }

  handleDeleteButton = () => {
    const {toggleDeleteButton, id} = this.props;
    toggleDeleteButton(id);
  }

  handleComplete = () => {
    const {toggleCompletition, id} = this.props;
    toggleCompletition(id);
  }

  handleImportant = () => {
    const {toggleImportant, id} = this.props;
    toggleImportant(id);
  }

  render() {
    const {todo} = this.props;
    const {isCompleted} = this.props;
    const {isImportant} = this.props;
    return (
      <div className="todo-item">
        <div role="presentation" onClick={this.handleComplete} className={`${isCompleted === true ? 'task-completed' : 'todo-text'} ${isImportant === true ? 'task-important' : 'todo-text'}`}>{todo}</div>
        <div className="buttons-wrapper">
          <button type="button" onClick={this.handleImportant} className={isImportant === false ? 'important-button' : 'not-important-button'} />
          <button type="button" className="delete-button" onClick={this.handleDeleteButton}>
            <i className="fas fa-trash-alt delete-icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
