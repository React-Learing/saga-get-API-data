import { call, put } from 'redux-saga/effects';
import { readSucces, readRequest } from '../actions/index';

export function* readAPI() {
  try {
    yield put(readRequest());
    const data = yield call(() => fetch('https://api.github.com/')
      .then((res) => res.json()));
    yield put(readSucces(data));
  } catch (error) {
    console.log('read error Ribbt');
  }
}
