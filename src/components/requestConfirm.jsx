import React from 'react'
import {Modal} from 'react-overlays'

export default ({show, close}) => (
    <Modal
        aria-labelledby='modal-label'
        className = 'modal'
        backdropClassName ='backdrop'
        show={show}
        onHide={close}
        keyboard = {true}
        onEscapeKeyDown ={close}
    >
        <div className='dialog confirm' >
            <h4 id='modal-label'>All done!</h4>
            <p>You will be one of the first of expericenceBroccoli  Co. When we launch.</p>
            <button type='button' onClick={close} name='ok'>OK</button>
        </div>
   </Modal>
)