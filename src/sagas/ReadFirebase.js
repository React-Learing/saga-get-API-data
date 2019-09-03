import firebase from 'firebase';
import { call, put } from 'redux-saga/effects';
import { readSucces } from '../actions/index';

export function* readFirebas(data) {
  const { path } = data;
  try {
    console.log('saga in ');
    const data = yield call(() => {
      firebase.database().ref(path).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log('Firebase', data);
      });
    });
    yield put(readSucces(data));
  } catch (error) {
    console.log('read error');
  }
}
