import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'

import App from '../App';
import RequestConfirm from '../components/requestConfirm'
import RequestInvite from '../components/requestInvite'

configure({adapter: new Adapter()})

jest.mock('axios')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);

});

it('renders request an invite button', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('button').text()).toBe('Request an invite');

});

it('renders RequestInvite Component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.containsMatchingElement(<RequestInvite show={false} />)).toBe(true);

});

it('show request a invite dialog when click request an invite button', () => {
  const wrapper = mount(<App />)
  wrapper.find('button').simulate('click')
  expect(wrapper.find('input[name="email"]').exists()).toBe(true)
});

it('renders RequestConfirm Component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.containsMatchingElement(<RequestConfirm show={false} />)).toBe(true);
});

it('show a cycle: main screen, request an invite, ok,  main screen', (done) => {
  axios.post.mockResolvedValue({data:'Registered'})
  const wrapper = mount(<App />)
  wrapper.find('button').simulate('click')
  expect(wrapper.find('input[name="email"]').exists()).toBe(true)

  const requestInvite = wrapper.find(RequestInvite)
  requestInvite.setState({name:'test', email:'acte@foxmail.com', confirmEmail: 'acte@foxmail.com'})  
  const requestButton = requestInvite.find('button')
  expect(requestButton.exists()).toBe(true)
  requestInvite.find('button').simulate('click')

  setTimeout(()=>{
    wrapper.update()
    const confirm = wrapper.find(RequestConfirm).find('button')
    expect(confirm.exists()).toBe(true)
    confirm.simulate('click')

    expect(wrapper.find(RequestConfirm).find('button').exists()).toBe(false)
    done()

  }, 0)

});