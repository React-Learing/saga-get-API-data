import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  render() {
    const {
      value, onIncrement, onDecrement, incrementAsync, readAPI, read,
    } = this.props;


    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button type="button" onClick={onIncrement}>
            +
          </button>
          {' '}
          <span>{value}</span>
          {' '}
          <button type="button" onClick={onDecrement}>
            -
          </button>
          <div>
            <button type="button" onClick={incrementAsync}>
              Increment async
            </button>
          </div>
          <div>
            <button type="button" onClick={readAPI}>
              Read API
            </button>
          </div>
          <div>
            { read.isLoading ? 'Loading...' : JSON.stringify(read.data)}
          </div>

        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  readAPI: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  read: PropTypes.shape([]).isRequired,
};

export default Counter;
