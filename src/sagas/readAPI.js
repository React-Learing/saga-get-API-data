import { call,put} from 'redux-saga/effects'
import {readSucces} from '../actions/index'

export function* readAPI() {
    try {
      const data = yield call(() => {
        return fetch('https://api.github.com/')
                .then(res => res.json())
        }
      );
      yield put( readSucces(data))
    } catch (error) {
      console.log('read error Ribbt')
    }
  }