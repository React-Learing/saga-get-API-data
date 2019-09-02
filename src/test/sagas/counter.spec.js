import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../sagas/index";
import {incrementAsync ,readAPI }from '../../actions/index'

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);
const store = mockStore({});
sagaMiddleware.run(rootSaga);


describe('sagas', () => {
    describe('counter', () => {
        it('can successfully call the incrementAsync', () => {
            const expectedActions = [
              {
                type: "INCREMENT_ASYNC",
              },
            ];
            store.dispatch(incrementAsync());
            expect(store.getActions()).toEqual(expectedActions);
            store.clearActions()
          });

        it('can successfully call the incrementAsync', () => {
          const expectedActions = [
            {
              type: "READ_API",
            },
          ];
          store.dispatch(readAPI());
          expect(store.getActions()).toEqual(expectedActions);
        });
    })
})



