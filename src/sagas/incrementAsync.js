import { put, delay } from 'redux-saga/effects';

export default function* incrementAsync() {
  yield delay(3000);
  yield put({ type: 'INCREMENT' });
}
