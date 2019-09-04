/* eslint-disable no-alert, no-console */
import firebase from 'firebase';
import { call, put } from 'redux-saga/effects';
import { readSucces } from '../actions/index';

export default function* readFirebas(path) {
  try {
    const data = yield call(() => {
      firebase.database().ref(path).once('value', (snapshot) => {
        snapshot.val();
      });
    });
    yield put(readSucces(data));
  } catch (error) {
    console.log('read error');
  }
}
