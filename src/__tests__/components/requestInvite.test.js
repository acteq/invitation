import React from 'react'
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import axios from 'axios'
import RequestInvite from '../../components/requestInvite'

configure({adapter: new Adapter()})

jest.mock('axios')

it('renders <RequestInvite /> component', () => {
  const wrapper = shallow(<RequestInvite />);
  expect(wrapper.find(RequestInvite)).toBeDefined();
});

it('renders `name input field`', () => {
  const wrapper = shallow(<RequestInvite />);
  const element = wrapper.find('input[name="name"]')
  expect(element).toBeDefined()
  expect(element.prop('placeholder')).toEqual('Full name')
});

it('renders `email input field`', () => {
  const wrapper = shallow(<RequestInvite />);
  const element = wrapper.find('input[name="email"]')
  expect(element).toBeDefined()
  expect(element.prop('placeholder')).toEqual('Email')
});

it('renders `confirm email input field`', () => {
  const wrapper = shallow(<RequestInvite />);
  const element = wrapper.find('input[name="confirmEmail"]')
  expect(element).toBeDefined()
  expect(element.prop('placeholder')).toEqual('Confirm email')
});

it('renders an `button named Send`', () => {
  const wrapper = shallow(<RequestInvite />);
  expect(wrapper.find('button')).toBeDefined();
  expect(wrapper.find('button').text()).toBe('Send');
});


it('simulates assoicated click event on Send button with props.close function', (done) => {
  axios.post.mockResolvedValue({data:'Registered'})
  const onButtonClick = (succeed) => {
    expect(succeed).toBe(true);
    done();
  }
 
  const wrapper = shallow(<RequestInvite show={true}  close={onButtonClick}/>);
  wrapper.setState({name:'test', email:'acte@foxmail.com', confirmEmail: 'acte@foxmail.com'})
  wrapper.find('button').simulate('click');
  // expect(mockClose.mock.calls[0][0]).toBe(true);
});

it('check the text of Send button has changed to "sending, please wait..." if sended', (done) => {
  axios.post.mockResolvedValue({data:'Registered'})
 
  const onButtonClick = (succeed) => {
    expect(wrapper.find('button').text()).toBe('sending, please wait...')
    done();
  }

  const wrapper = shallow(<RequestInvite show={true}  close={onButtonClick}/>);
  wrapper.setState({name:'test', email:'acte@foxmail.com', confirmEmail: 'acte@foxmail.com'})
  wrapper.find('button').simulate('click');

});

it('show the text of error what api returned', (done) => {
  axios.post.mockRejectedValueOnce(new Error('Async error'))
  
  const wrapper = shallow(<RequestInvite show={true} />);
  wrapper.setState({name:'test', email:'acte@foxmail.com', confirmEmail: 'acte@foxmail.com'})
  wrapper.find('button').simulate('click');
  wrapper.update()
  setTimeout(()=>{
    expect(wrapper.find('.error').text()).toBe('Async error')
    done()
  }, 0)
  
});