import React from 'react';
import "./item-add-form.css";

const ItemAddForm = ({ onItemAdded }) => {
  return (
    <div className="item-add-form" onClick={onItemAdded}>
      <button className="btn btn-outline-secondary">
        Add New Item
      </button>
    </div>
  );
}

export default ItemAddForm;