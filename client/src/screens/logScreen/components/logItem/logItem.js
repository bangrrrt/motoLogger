import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { Motion, spring } from 'react-motion';

import Miles from './components/defaultView/miles/miles';
import Parts from './components/defaultView/parts/parts';
import PartsEditing from './components/editView/partsEditing/partsEditing'
import MilesEditing from './components/editView/milesEditing/milesEditing'

import EditMenu from './components/editMenu/editMenu';

import './logItem.css';

// Renders a log 
class LogItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: this.props.log.itemName,
      notesInput: this.props.log.notes,
      isExpanded: false,
      miles: this.props.log.miles
    };
  }

  handleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  renderLogNameInput = () => {
    const help = false;
    if (!this.props.log.isEditable) {
      return this.state.nameInput;
    }

    return (
      <FormGroup controlId={this.props.log.logId}>
        <FormControl
          className="log-item-title-input"
          placeholder="Log name"
          value={this.state.nameInput}
          onChange={(e) => {
            this.setState({
              ...this.state,
              nameInput: e.target.value
            });
          }}
          readOnly={!this.props.log.isEditable}
        />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  getLog = () => {
    const {
      logId,
      isEditable,
      dateAdded,
      parts,
      miles
    } = this.props.log;

    return {
      itemName: this.state.nameInput,
      notes: this.state.notesInput,
      logId,
      isEditable,
      dateAdded,
      parts,
      miles
    };
  }

  renderSaveIcon = () => {
    const { onAsyncUpdateLog } = this.props;

    return (
      <span
        onClick={() => {
          onAsyncUpdateLog(this.getLog());
        }}
        className="log-save"
        aria-hidden="true"
      >
        Save Log
      </span>
    );
  }

  renderCogIcon = () => {
    const {
      onToggleMenu,
      log: {
        logId
      }
    } = this.props;

    const hasActiveMenu = includes(this.props.activeMenuLogId, this.props.log.logId);

    return (
      <span
        onClick={() => onToggleMenu(logId)}
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

  renderNotes = (height) => {
    const help = false;
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
      <FormGroup controlId={this.props.log.logId}>
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
        {help && <HelpBlock>{help}</HelpBlock>}
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
    if(this.props.log.isEditable) {
      return this.renderEditView();
    }

    return this.renderDefaultView();
  }

  render() {
    const {
      activeMenuLogId,
      log: {
        isEditable,
        logId,
      }
    } = this.props;

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
        {
          ({ height, logMenuHeight }) => {
            const logMenu = (
              <div
                className="log-item-edit-menu"
                style={{ height: logMenuHeight }}
              >
                {hasActiveMenu && <EditMenu {...this.props} />}
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
          }
        }
        </Motion>
      </div>
    );
  }
}

const { func, array } = PropTypes;

LogItem.propTypes = {
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
  activeMenuLogId: array.isRequired
};

LogItem.defaultProps = {
  log: {}
};

export default LogItem;