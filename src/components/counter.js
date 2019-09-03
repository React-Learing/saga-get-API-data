import React from 'react';

class Counter extends React.Component {
  render() {
    const {
      value, onIncrement, onDecrement, incrementAsync, readAPI,
    } = this.props;

    const {
      data, isLoading,
    } = this.props.read;

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
            { isLoading ? 'Loading...' : JSON.stringify(data)}
          </div>

        </div>
      </div>
    );
  }
}

export default Counter;
