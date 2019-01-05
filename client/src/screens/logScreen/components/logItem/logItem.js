import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import size from 'lodash/size';
import includes from 'lodash/includes';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Motion, spring } from 'react-motion';

import Miles from './components/defaultView/miles/miles';
import Parts from './components/defaultView/parts/parts';
import PartsEditing from './components/editView/partsEditing/partsEditing';
import MilesEditing from './components/editView/milesEditing/milesEditing';

import EditMenu from './components/editMenu/editMenu';

import './logItem.css';

// Renders a log
class LogItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: this.props.log.logName,
      notesInput: this.props.log.notes,
      logId: this.props.log.logId || 'newLog',
      isExpanded: false,
      miles: this.props.log.miles,
      errors: {},
      isFormSubmitted: false,
      motorcycleId: this.props.motorcycleId
    };
  }

  getLog = () => {
    const {
      motorcycleId,
      nameInput,
      notesInput,
      logId,
      miles
    } = this.state;

    return {
      logName: nameInput,
      motorcycleId,
      logId: this.state.logId || logId,
      notes: notesInput,
      miles,
      parts: this.props.log.parts || []
    };
  }

  handleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  renderLogNameInput = () => {
    const { errors, nameInput } = this.state;
    if (!this.props.log.isEditable) {
      return nameInput;
    }

    return (
      <FormGroup key={this.state.logId} controlId={this.state.logId}>
        <FormControl
          className="log-item-title-input"
          placeholder="Maintenance name"
          type="input"
          value={nameInput}
          onChange={(e) => {
            this.setState({
              ...this.state,
              nameInput: e.target.value
            });
          }}
          readOnly={!this.props.log.isEditable}
        />
        {errors.name && nameInput === '' && <span className="log-item-title-error">{errors.name}</span>}
      </FormGroup>
    );
  }

  /**
   * Renders save icon and handles log submission
   */
  renderSaveIcon = () => {
    const {
      onAsyncCreateLog,
      onAsyncUpdateLog,
      isNewItemCreated
    } = this.props;

    return (
      <span
        onClick={() => {
          const errors = {};

          this.setState({ isFormSubmitted: true });

          if (!this.state.nameInput) {
            const message = 'Please name this log';
            errors.name = message;
          }

          if (isNewItemCreated && size(errors) === 0) {
            onAsyncCreateLog(this.getLog());
          } else if (size(errors) === 0) {
            onAsyncUpdateLog(this.getLog());
          }

          this.setState({ errors });
        }}
        className="log-save"
        aria-hidden="true"
      >
        Save Log
      </span>
    );
  }

  /**
   * Renders the Menu Icon
  */
  renderCogIcon = () => {
    const {
      onToggleMenu,
      activeMenuLogId,
      log: {
        logId
      }
    } = this.props;

    const hasActiveMenu = includes(activeMenuLogId, logId);

    return (
      <span
        onClick={() => {
          if (!activeMenuLogId.length) {
            onToggleMenu(logId);
          }
        }}
        className={`
          glyphicon
          glyphicon-cog
          log-item-icon
          log-item-icon-cog${hasActiveMenu ? '--active log-cog-icon-rotating' : ''}
        `}
        aria-hidden="true"
      />
    );
  }

  /**
   * Renders the notes section
   */
  renderNotes = (height) => {
    if (!this.props.log.isEditable) {
      return (
        <p
          className="log-item-notes-body"
          style={{
            overflowY: this.state.isExpanded ? 'auto' : 'hidden',
            height
          }}
        >
          {this.props.log.notes}
        </p>
      );
    }

    return (
      <FormGroup controlId={this.state.logId}>
        <FormControl
          className="log-item-notes-body"
          placeholder="Add notes"
          componentClass="textarea"
          value={this.state.notesInput}
          onChange={(e) => {
            this.setState({
              ...this.state,
              notesInput: e.target.value
            });
          }}
          readOnly={!this.props.log.isEditable}
        />
      </FormGroup>
    );
  }

  renderDefaultView = () => {
    const {
      parts,
      dateAdded,
      logId,
      miles
    } = this.props.log;

    return (
      <div
        onClick={() => this.handleExpand()}
      >
        <Parts
          isExpanded={this.state.isExpanded}
          parts={parts}
          logId={logId}
        />
        <Miles
          isExpanded={this.state.isExpanded}
          miles={miles}
          logId={logId}
          dateAdded={dateAdded}
        />
      </div>
    );
  }
  renderEditView = () => {
    const {
      onDeleteLogParts,
      onAddLogPart,
      onUpdateDate,
      onAddLogMiles,
      log: {
        parts,
        isEditable,
        dateAdded,
        logId,
        miles
      }
    } = this.props;

    return (
      <div>
        <PartsEditing
          parts={parts}
          logId={logId}
          onDeleteLogParts={onDeleteLogParts}
          onAddLogPart={onAddLogPart}
        />
        <MilesEditing
          miles={miles}
          logId={logId}
          dateAdded={dateAdded}
          isEditable={isEditable}
          onUpdateDate={onUpdateDate}
          onAddLogMiles={onAddLogMiles}
        />
      </div>
    );
  }

  renderLogContent = () => {
    if (this.props.log.isEditable) {
      return this.renderEditView();
    }

    return this.renderDefaultView();
  }

  render() {
    const {
      activeMenuLogId,
      log: {
        isEditable,
        logId
      }
    } = this.props;
    // @TODO Update the data type of activeMenuLogId to be a string instead of an array
    const hasActiveMenu = includes(activeMenuLogId, logId);

    return (
      <div
        ref={(node) => { this.logContainer = node; }}
        className="log-container"
      >
        <Motion
          style={{
            height: spring(this.state.isExpanded ? 150 : 60),
            logMenuHeight: spring(hasActiveMenu ? 86 : 0)
          }}
        >
          {({ height, logMenuHeight }) => {
            const logMenu = (
              <div
                className="log-item-edit-menu"
                style={{ height: logMenuHeight }}
              >
                {hasActiveMenu && <EditMenu logId={this.state.logId} {...this.props} />}
              </div>
            );
            return (
              <div
                style={{ opacity: hasActiveMenu || (isEditable && hasActiveMenu) ? '0.5' : '1' }}
                className={`log-item-wrapper fadeIn animated log-item${isEditable ? '--editing' : ''}`}
                ref={(log) => { this.logNode = log; }}
              >
                <div className="log-item-title">
                  <h3 className="log-item-title-name">
                    {this.renderLogNameInput()}
                  </h3>
                  {hasActiveMenu && createPortal(logMenu, this.logContainer)}
                  {isEditable && this.renderSaveIcon()}
                  <div className={`log-item-icons${isEditable ? '--editing' : ''}`}>
                    {this.renderCogIcon()}
                  </div>
                </div>
                {this.renderLogContent()}
                <div className={`log-item-notes-wrapper${isEditable ? '--editing' : ''} log-item-section`}>
                  {this.renderNotes(height)}
                </div>
              </div>
            );
          }}
        </Motion>
      </div>
    );
  }
}

const {
  func,
  array,
  bool,
  shape,
  string,
  number
} = PropTypes;

LogItem.propTypes = {
  /**
   * Action that updates a log's date
   */
  onUpdateDate: func.isRequired,
  /**
   * Log values and settings
   */
  log: shape({
    /**
     * The name of the log
     */
    logName: string,
    /**
     * Array of parts associated with the log
     */
    parts: array,
    /**
     * True if the log is in edit mode
     */
    isEditable: bool,
    /**
     * The date the maintenance was done
     */
    dateAdded: string,
    /**
     * The unique identifier for the log
     */
    logId: string,
    /**
     * How many miles the user is currently at
     */
    miles: number
  }),
  /**
   * True when user just created a new log
  */
  isNewItemCreated: bool.isRequired,
  /**
   * Async func that creates a new log in the data base
  */
  onAsyncCreateLog: func.isRequired,
  /**
   * Action that adds miles to the log item
   */
  onAddLogMiles: func.isRequired,
  /**
   * Action that deletes an array of logs
   */
  onDeleteLogParts: func.isRequired,
  /**
   * Action that adds a part to the log
   */
  onAddLogPart: func.isRequired,
  /**
   * Action that opens the log menu
   */
  onToggleMenu: func.isRequired,
  /**
   * Action that allows user to edit the log
   */
  onEditLog: func.isRequired,
  /**
   * An async action that deletes a log
   */
  onAsyncDeleteItem: func.isRequired,
  /**
   * An async action that saves any changes to the log
   */
  onAsyncUpdateLog: func.isRequired,
  /**
   * True if the log is in editing mode
   */
  activeMenuLogId: array.isRequired,
  /**
   * The id of the motorcycle that the log belongs to
   */
  motorcycleId: string
};

LogItem.defaultProps = {
  log: {},
  motorcycleId: ''
};

export default LogItem;
