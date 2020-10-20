import React, {Component} from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

  state = {
    label: ''
  };

  onSearchChange = (event) => {
    this.setState( {
      label: event.target.value
    });

    this.props.onSearch(this.state.label)
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onSearchChange}
        
      />
    );
  };
};