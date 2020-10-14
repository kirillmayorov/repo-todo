import React from 'react';
import "./item-add-form.css";

const ItemAddForm = ({ onAdded }) => {
  return (
    <div className="item-add-form" onClick={onAdded}>
      <button className="btn btn-outline-secondary">
        Add New Item
      </button>
    </div>
  );
}

export default ItemAddForm;