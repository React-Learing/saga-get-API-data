/* eslint-disable no-constant-condition */

import { takeEvery } from 'redux-saga/effects';
import readAPI from './readAPI';
import incrementAsync from './incrementAsync';


export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
  yield takeEvery('READ_API', readAPI);
}
