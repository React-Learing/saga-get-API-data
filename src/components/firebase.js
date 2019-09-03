import React from 'react';
import firebase from 'firebase';

class Firebase extends React.Component {
  constructor() {
    super();

    this.state = {
      setpath: '/set',
      setText: '',
      readonce: {},
      readon: {},
    };
  }


  render() {
    const { readFirebase } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>Firebase Example</h1>
        <div>
          <button onClick={() => readFirebase('/push')}>
                Read FirebaseSaga
          </button>
        </div>
      </div>
    );
  }
}

export default Firebase;
