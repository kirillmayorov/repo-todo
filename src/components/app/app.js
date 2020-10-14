import React, {Component} from 'react';

import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter'
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form'
import './app.css';

export default class App extends Component {
  state = {
    todoData: [
    { label: "Drink Coffee", important: false, id: 1 },
    { label: "Build React App", important: true, id: 2 },
    { label: "Have a lunch", important: false, id: 3 },
  ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArray = [...before, ...after];

      return {
        todoData: newArray
      }
    });
  };

  addItem = () => {
    this.setState(({ todoData}) => {
      let shallowCopy = [ ...todoData ];

      shallowCopy.push({
        label: "New Item",
        important: false,
        id: 4,
      });

      console.log(shallowCopy);

      return {
        todoData: shallowCopy
      };
    })
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
          todos={ this.state.todoData }
          onDeleted={ this.deleteItem }
        />
        <ItemAddForm onAdded={ this.addItem }/>
      </div>
    );
  }
};