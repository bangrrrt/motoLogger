import React, { Component } from 'react';

import './editMenu.css';

class EditMenu extends Component {
  componentDidMount() {
    this.menuNode.focus();
  }

  handleMenuToggle = () => {
    this.props.onToggleMenu(this.props.log.logId);
  }

  render() {
    const {
      onToggleMenu,
      onEditLog,
      onAsyncDeleteItem,
      log: {
        isEditable,
        logId
      }
    } = this.props;
    return (
      <ul
        tabIndex="1"
        className="log-item-edit-menu-list"
        onBlur={this.handleMenuToggle}
        ref={(node) => {
          this.menuNode = node;
        }}
      >
        <li
          onClick={(e) => {
            if (!isEditable) {
              onEditLog(logId)
            }
            e.preventDefault();
          }}
          className={`log-item-edit-menu-list-item log-item-edit-menu-button${isEditable ? '--editing' : ''}`}
        >
          Edit
        </li>
        <li
          className="log-item-edit-menu-list-item"
          onClick={() => onAsyncDeleteItem(logId)}
        >
          Delete
        </li>
        <li
          className="log-item-edit-menu-list-item"
          onClick={() => onToggleMenu(logId)}
        >
          Close
        </li>
      </ul>
    );
  }
}

EditMenu.propTypes = {

};

export default EditMenu;