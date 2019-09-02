export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INCREMENT_ASYNC = "INCREMENT_ASYNC";
export const READ_API = "READ_API";
export const READ_SUCCES = "READ_SUCCES";
export const READ_FIREBASE = "READ_FIREBASE";

export function onIncrement() {
  return {
    type: INCREMENT
  };
}

export function onDecrement() {
  return {
    type: DECREMENT
  };
}

export function incrementAsync() {
  return {
    type: INCREMENT_ASYNC
  };
}

export function readAPI() {
  console.log('action read')
  return {
    type: READ_API
  };
}

export function readSucces(data) {
  console.log('action 啟動')
  return {
    type: READ_SUCCES,
    payload:  data
  };
}

export function readFirebase(path) {
  return {
    path : path,
    type: READ_FIREBASE
  };
}