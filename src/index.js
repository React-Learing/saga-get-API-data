import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Counter from './containers/counter';
import configureStore from './store/configureStore';
import FirebaseInit from './firebase/Firebase';

import './styles.css';

const store = configureStore();
FirebaseInit.init();

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  rootElement
);
