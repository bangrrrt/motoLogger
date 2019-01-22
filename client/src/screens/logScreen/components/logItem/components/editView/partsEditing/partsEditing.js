import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import map from 'lodash/map';
import { floatToAmount } from 'money-math';
import includes from 'lodash/includes';
import some from 'lodash/some';
import filter from 'lodash/filter';

import getTotalPartsAmount from '../../helper';

import './partsEditing.css';

// Renders the editing view for the parts
class PartsEditing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      priceInput: '',
      error: '',
      selectedParts: []
    };
  }

  componentDidMount() {
    this.partNameInput.addEventListener('keypress', this.handleEnterPress);
    this.partPriceInput.addEventListener('keypress', this.handleEnterPress);
  }

  componentWillUnmount() {
    this.partNameInput.removeEventListener('keypress', this.handleEnterPress);
    this.partPriceInput.removeEventListener('keypress', this.handleEnterPress);
  }

  handleEnterPress = (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
      this.handlePartSave();
    }
  }

  handlePartDelete = () => {
    this.props.onDeleteLogParts(this.state.selectedParts, this.props.logId);

    this.setState({
      ...this.state,
      selectedParts: []
    });
  }

  handlePartSave = () => {
    // Check if what the user entered already exists in the parts array
    if (some(this.props.parts, { partName: this.state.nameInput })) {
      this.setState({
        error: 'This part name already exists.'
      });
    } else if (this.state.nameInput) {
      const newPart = {
        partName: this.state.nameInput,
        price: this.state.priceInput
      };
      this.props.onAddLogPart(newPart, this.props.logId);
      this.setState({
        nameInput: '',
        priceInput: '',
        error: ''
      });
      this.partNameInput.focus();
    } else {
      this.setState({
        error: 'Please enter a part name.'
      });
    }
  }

  handleCheckboxToggle = (inputNode, index) => {
    if (includes(this.state.selectedParts, index)) {
      inputNode.checked = false;
      this.setState({
        ...this.state,
        selectedParts: filter(this.state.selectedParts, index)
      });
    } else {
      inputNode.checked = true;
      this.setState({
        ...this.state,
        selectedParts: [
          ...this.state.selectedParts,
          index
        ]
      });
    }
  }

  renderPartInput = () => {
    const { error } = this.state;

    return (
      <div>
        <div className="log-item-part-input-wrapper">
          <FormGroup
            className="log-item-part-inputs"
            controlId={this.props.logId}
          >
            <FormControl
              inputRef={(node) => { this.partNameInput = node; }}
              className="log-item-part-input log-item-part-name-input"
              placeholder="Part name"
              value={this.state.nameInput}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  nameInput: e.target.value
                });
              }}
            />
            <FormControl
              inputRef={(node) => { this.partPriceInput = node; }}
              className="log-item-part-input log-item-part-price-input"
              placeholder="Price"
              value={this.state.priceInput}
              type="number"
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  priceInput: e.target.value
                });
              }}
            />
          </FormGroup>
          {error && <span className="log-item-part-input-error">{error}</span>}
        </div>
        <div className="log-item-part-input-button-wrapper">
          <Button
            disabled={!this.state.selectedParts.length}
            className="log-item-part-input-button"
            onClick={() => this.handlePartDelete()}
          >
            Delete Part
          </Button>
          <Button
            disabled={!this.state.nameInput.length}
            className="log-item-part-input-button"
            onClick={() => this.handlePartSave()}
          >
            Add Part
          </Button>
        </div>
      </div>
    );
  }

  renderParts = () => {
    if (!this.props.parts.length) {
      return (
        <li className="log-item-part log-item-no-parts text-center">
          <span>Add parts used for maintenance</span>
        </li>
      );
    }

    return map(this.props.parts || this.props.editingParts, (part, index) => {
      const dollarSign = part.price ? <span>$ {floatToAmount(part.price)}</span> : null;
      return (
        <li
          key={`${part.partName}-row`}
          className="log-item-part"
          onClick={() => this.handleCheckboxToggle(this[`inputNode-${part.partName}`], index)}
        >
          {index >= 1 && <div className="log-item-part-divider" />}
          <div className="log-item-part-info">
            <div>
              <input
                name={`${part.partName}-input`}
                ref={(node) => { this[`inputNode-${part.partName}`] = node; }}
                className="log-item-part-checkbox"
                type="checkbox"
              />
              <span>{part.partName}</span>
            </div>
            {dollarSign}
          </div>
        </li>
      );
    });
  }

  render() {
    const { parts } = this.props;

    return (
      <div className="log-item-parts-wrapper">
        <div className="log-item-total-parts-editing">
          <span>{parts.length} Part{parts.length !== 1 ? 's' : ''}</span>
          <span>{getTotalPartsAmount(parts)}</span>
        </div>
        <ul className="log-item-parts">
          {this.renderParts()}
        </ul>
        {this.renderPartInput()}
      </div>
    );
  }
}

const { string, array, func } = PropTypes;

PartsEditing.propTypes = {
  /**
   * Action that deletes an array of logs
   */
  onDeleteLogParts: func.isRequired,
  /**
   * Action that adds a part to the log
   */
  onAddLogPart: func.isRequired,
  /**
   * Array of parts
   */
  parts: array,
  /**
   * The unique log id
   */
  logId: string.isRequired
};

PartsEditing.defaultProps = {
  parts: []
};

export default PartsEditing;