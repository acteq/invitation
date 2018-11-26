import {requestInvite} from '../api'
import React, { Component } from 'react'
import {Modal} from 'react-overlays'

import {checkRequest} from '../biz'

class RequestInvite  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      confirmEmail: '',
      name: '',
      error: '',
      sendText: 'Send'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
        <Modal
          aria-labelledby='modal-label'
          className = 'modal'
          backdropClassName ='backdrop'
          show={this.props.show}
          keyboard = {true}
          onEscapeKeyDown ={this.props.close}
        >
          <div className='dialog' >
            <h4 id='modal-label'>Request an invite</h4>
            <form className='RequestInviteForm'>
                <input placeholder='Full name' type='text' name='name' defaultValue={this.state.name} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }}></input>
                <input placeholder='Email' type='email' name='email'  defaultValue={this.state.email} onChange={this.handleChange} ref={(input) => { this.emailInput = input; }}></input> 
                <input placeholder='Confirm email' type='email' name='confirmEmail' defaultValue={this.state.confirmEmail} onChange={this.handleChange} ref={(input) => { this.confirmEmailInput = input; }}></input> 
                <button type='button' onClick={this.handleSubmit} >{this.state.sendText}</button>
                <span className='error'>{this.state.error}</span>
            </form>
          </div>
        </Modal>
    );
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    // event.preventDefault();
    let result = checkRequest(this.state.name, this.state.email, this.state.confirmEmail)
    switch(result){
      case 0:
        this.setState({sendText:'sending, please wait...'})
        requestInvite(this.state.name, this.state.email)
          .then( data=>{ 
            if(this.props.close){
              this.props.close(true)
            }
            this.setState({sendText:'Send', name:'', email:'', confirmEmail:''})
          }).catch(errorMessage => {
            this.setState({error: errorMessage, sendText:'Send'})
          })
        break
      case 1:
        this.nameInput.focus()
        break
      case 2:
        this.emailInput.focus()
        break
      case 3:
        this.confirmEmailInput.focus()
        break
      case 4:
        this.confirmEmailInput.focus()
          break
      default:
        break
    }
  }
}

export default RequestInvite