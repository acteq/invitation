import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import RequestConfirm from '../../components/requestConfirm'

configure({adapter: new Adapter()})

it('renders <RequestConfirm /> component', () => {
  const wrapper = shallow(<RequestConfirm />);
  expect(wrapper.find(RequestConfirm)).toBeDefined();
});

it('renders an `button named OK`', () => {
  const wrapper = shallow(<RequestConfirm />);
  expect(wrapper.find('button')).toBeDefined();
  expect(wrapper.find('button').text()).toBe('OK');
});

it('simulates assoicated click event on OK button with props.close function', (done) => {
  const onButtonClick = () => {
    expect(true).toBe(true);
    done();
  }
  const wrapper = shallow(<RequestConfirm  close={onButtonClick}/>);
  wrapper.find('button').simulate('click');
  
});