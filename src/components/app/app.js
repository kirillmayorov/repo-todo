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
      id: this.maxId++,
      isVisible: true
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

  toggleProperty(arr, id, propName) {
     const idx = arr.findIndex(el => el.id === id);//arr - массив todoData

     // apdate object
     const oldItem = arr[idx];
     const newItem = { ...oldItem,
      [propName]: !oldItem[propName]};

     return [
       ...arr.slice(0, idx),
       newItem,
       ...arr.slice(idx + 1),
     ];
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    })
  };

  onSearch = (text) => {
    console.log(text);
    this.setState(() => {
      const labelText = 'Drink Coffee';
      const newItems = this.state.todoData.filter((item) => item.label === labelText );

      // console.log(newItems);
      // console.log(this.state.todoData);

      return({
        todoData: newItems
      })
    })
  }

  render() {
    const { todoData } = this.state; 

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={doneCount} done={todoCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={ this.onSearch }/>
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};