import React, {PureComponent} from 'react';
import Form from './Form';
import TodoItem from './TodoItem';
import Tabs from './Tabs';
import './styles.css';


class App extends PureComponent {
  state = {
    todos: [],
    tabStatus: 'all',
    filtered: null
  }

  componentDidMount() {
    if (localStorage.getItem('todos')) {
      let todosStorage = localStorage.getItem('todos');
      todosStorage = JSON.parse(todosStorage);
      this.setState({todos: todosStorage});
    } else {
      const todosStorage = [];
      localStorage.setItem('todos', JSON.stringify(todosStorage));
      this.setState({todos: todosStorage});
    }
  }

  handleSubmitButton = value => this.setState({todos: value});

  handleSubmitTabClick = value => this.setState({tabStatus: value});

  whatToRender = (todoArray) => {
    const {tabStatus} = this.state;
    if (tabStatus === 'active') {
      return todoArray.filter(todo => todo.isCompleted === false);
    }
    if (tabStatus === 'completed') {
      return todoArray.filter(todo => todo.isCompleted === true);
    }
    return todoArray;
  }

  handleDeleteTodo = (id) => {
    const {todos} = this.state;
    let stateTodos = todos;
    stateTodos = stateTodos.filter(todo => todo.id !== id);
    this.setState({todos: stateTodos});
    localStorage.setItem('todos', JSON.stringify(stateTodos));
  }

  handleCompletiteTodo = (id) => {
    const {todos} = this.state;
    let stateTodos = todos;
    stateTodos = stateTodos.map((value) => {
      const item = value;
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
        return item;
      }
      return item;
    });
    this.setState({todos: stateTodos});
    localStorage.setItem('todos', JSON.stringify(stateTodos));
  }

  handleImportantTodo = (id) => {
    const {todos} = this.state;
    let importantTodos = todos;
    importantTodos = importantTodos.map((value) => {
      const item = value;
      if (item.id === id) {
        item.isImportant = !item.isImportant;
        return item;
      }
      return item;
    });
    this.setState({todos: importantTodos});
    localStorage.setItem('todos', JSON.stringify(importantTodos));
  }

  handleChangeSearchInput = (e) => {
    const {todos} = this.state;
    let newList = null;
    if (e.target.value !== '') {
      newList = todos.filter((item) => {
        const lc = item.todo.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    }
    this.setState({
      filtered: newList
    });
  }

  render() {
    let {todos} = this.state;
    const {filtered} = this.state;

    todos = filtered !== null ? filtered : todos;

    todos = this.whatToRender(todos);

    return (
      <div className="app-container">
        <div className="todos-container">
          <div className="logo-search-wrapper">
            <img className="logo" src="https://senlainc.com/wp-content/themes/senla-theme/img/logo_header.svg" alt="oops!" />
            <input
              type="text"
              name="search-bar"
              maxLength="100"
              onChange={this.handleChangeSearchInput}
              placeholder="Search task for to do"
              className="search-input"
            />
          </div>
          <div>
            <Tabs tabClick={this.handleSubmitTabClick} />
          </div>

          <Form onSubmit={this.handleSubmitButton} />
          <div className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                toggleDeleteButton={this.handleDeleteTodo}
                toggleCompletition={this.handleCompletiteTodo}
                toggleImportant={this.handleImportantTodo}
                {...todo}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
