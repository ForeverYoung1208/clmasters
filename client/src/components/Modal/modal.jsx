import React from 'react'
import PT from 'prop-types';
import ReactModal from 'react-modal';
import classes from './modal.module.css'

function Modal(props) {
	const {closeModalFn, caption, level=0} = props
  const isModalShowing = true; 

  return(
        <ReactModal 
          style={{
            content: {
              transform: `translate(${10*level}px, ${10*level}px )`
            }
          }}
          isOpen={isModalShowing}
          contentLabel="onRequestClose Example"
          onRequestClose={
          //  ()=>console.log('......... onRequestClose ........')
            closeModalFn
          }
          //  className={classes["Modal"]}
          //  overlayClassName={classes["Overlay"]}
           shouldCloseOnOverlayClick={false}
        >

          <div className={classes['header']}>
            <div className={classes['caption']}><h4>{caption}</h4></div>
            <button className={classes['close_btn']+' btn btn-outline-primary btn-sm'} onClick={() => closeModalFn()}><i className="fa fa-times" aria-hidden="true"></i></button>
            
          </div>

          {props.children}

        </ReactModal>
	)
}

Modal.propTypes = {
  closeModalFn: PT.func.isRequired,
  caption: PT.string,
  level: PT.number
};
export default Modal
