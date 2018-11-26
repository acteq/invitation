import React, { Component } from 'react'
import './App.css'
import RequestInvite from './components/requestInvite'
import RequestConfirm from './components/requestConfirm'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {showRequest: false, showConfirm: false}
    this.openRequest = this.openRequest.bind(this)
    this.closeRequest = this.closeRequest.bind(this)
    this.openConfirm = this.openConfirm.bind(this)
    this.closeConfirm = this.closeConfirm.bind(this)
  }

  render() {
    return (
      <div className="App">
        <h1>A better way </h1>
        <h1>to enjoy ervery day.</h1>
        <p>Be the first to know when we launch.</p>
        
        <button type='button' onClick={this.openRequest}>Request an invite</button>
        <RequestInvite show={this.state.showRequest} close={this.closeRequest}/>
        <RequestConfirm show={this.state.showConfirm} close={this.closeConfirm}/>
      </div>
    );
  }

  closeRequest(succeed) {
 
    this.setState({ showRequest: false })
    if(succeed === true){
      this.openConfirm();
    }
  }

  openRequest() {
    this.setState({ showRequest: true });
  }

  closeConfirm() {
    this.setState({ showConfirm: false });
  }

  openConfirm() {
    this.setState({ showConfirm: true });
  }
}

export default App;
