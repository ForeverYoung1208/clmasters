import React from 'react'
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import './ModalConfirm.scss'

export const ModalConfirm = ({
  header = 'Confirm action?',
  body = '',
  onCancel,
  onAgree }
) => {

  [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    setIsOpen(true)
  }, [])
  
  const cancelHandler = () => {
    setIsOpen(false)
    onCancel()
  }

  const agreeHandler = () => {
    setIsOpen(false)
    onAgree()
  }


  return(
    <ReactModal 
      isOpen={true}
      contentLabel="onRequestClose Example"
      onRequestClose={ onCancel }
      className='modal-confirm'
      shouldCloseOnOverlayClick={true}
    >
      <div className='modal-confirm__header'>
        header: {header}
      </div>

      <div className='modal-confirm__body'>
        body: {body}
      </div>

      <div className="modal-confirm__buttons">
        <Button onClick={cancelHandler}> Cancel </Button>
        <Button onClick={agreeHandler}> Agree </Button>
      </div>

    </ReactModal>
	)
}
