import React, { Component } from 'react';

import PropTypes from 'prop-types';

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
          onClick={() => {
            const confirmed = window.confirm('Are you sure you want to delete this log?');
            if (confirmed) {
              onAsyncDeleteItem(logId);
            }
          }}
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

const { func, object } = PropTypes;

EditMenu.propTypes = {
  /**
   * The log that has the edit menu open
  */
  log: object.isRequired,
  /**
   * Action that edits a log
   */
  onEditLog: func.isRequired,
  /**
   * Async action that deletes a log
   */
  onAsyncDeleteItem: func.isRequired,
  /**
   *  Action that opens the edit menu
   */
  onToggleMenu: func.isRequired

};

export default EditMenu;
