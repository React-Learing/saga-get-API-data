import expect from 'expect';
import React from 'react';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../containers/counter';

import configureStore from '../../store/configureStore';

configure({ adapter: new Adapter() });

function setup(initialState) {
  const store = configureStore(initialState);
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  return {
    app,
    buttons: app.find('button'),
    span: app.find('span'),
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { span } = setup();
      expect(span.text()).toMatch(/120/);
    });

    it('should display updated count after increment button click', () => {
      const { buttons, span } = setup();
      buttons.at(0).simulate('click');
      expect(span.text()).toMatch(/121/);
    });

    it('should display updated count after decrement button click', () => {
      const { buttons, span } = setup();
      buttons.at(1).simulate('click');
      expect(span.text()).toMatch(/119/);
    });
  });
});
