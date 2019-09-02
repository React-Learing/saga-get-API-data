import React from "react";
import ReactDOM from "react-dom";
import Counter from "./containers/counter";
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import Firebase from './components/firebase'
import FirebaseInit from './firebase/Firebase'

import "./styles.css";

const store = configureStore();
FirebaseInit.init()

function App() {
  return (
    <div className="App">
      <Counter />
      <Firebase/>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  rootElement
);