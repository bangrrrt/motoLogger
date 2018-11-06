import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

class AddMotorcycle extends Component {
  constructor() {
    super();

    this.state = {
      name: ''
    };
  }

  componentDidMount() {
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  renderSavedMotorcycles = () => {
    if (!this.props.motorcycles) {
      return null;
    }

    if (this.props.motorcycles && !this.props.motorcycles.length) {
      return (
        <div>
          <p>Add your first motorcycle!</p>
          <div>
            <input
              type="text"
              onChange={this.handleNameChange}
              value={this.state.name}
            />
            <button
              onClick={() => console.log('Motorcycle added')}
            >
              Add
            </button>
          </div>
        </div>
      );
    }

    return this.props.motorcycles.map(motorcycle => (
      <span>{motorcycle.name}</span>
    ));
  }

  render() {
    return (
      <Modal
        show
      >
        <Modal.Body>
          <h1>Garage</h1>
          {this.renderSavedMotorcycles()}
        </Modal.Body>
      </Modal>
    );
  }
}

const { arrayOf, object } = PropTypes;

AddMotorcycle.propTypes = {
  /**
   * List of motorcycles the user has in their garage
   */
  motorcycles: arrayOf(object).isRequired
};

AddMotorcycle.defaultProps = {

};

export default AddMotorcycle;
