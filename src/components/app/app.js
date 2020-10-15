import React, {Component} from 'react';

import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter'
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form'
import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Build Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
  };

  createTodoItem(label) {

    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArray = [...before, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (label) => {
      this.setState(({ todoData }) => {
        label = "New Item";
        const newItem = this.createTodoItem(label);
        const newArr = [ ...todoData, newItem ];
        return {
          todoData: newArr,
        };
    });
  };

  onToggleDone = id => 
    {this.setState(({ todoData }) => {
      console.log("toggle done", id);
    });
    };

  onToggleImportant = id => {
    console.log("toggle important", id);
  };

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <ItemStatusFilter />
          <SearchPanel />
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};