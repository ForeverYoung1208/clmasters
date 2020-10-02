import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../components/Button/Button'
import { clearAdmindataApiError } from '../../../store/actions/admin'


export const AdminPageError = () => {
  const storeAdmin = useSelector((store)=> store.admin)
  const { submissionError } = storeAdmin
  const { unknownError } = storeAdmin
  const dispatch = useDispatch()
  
  return (
    <>
      { submissionError && <div> server submissionError: {submissionError.errors[0].msg} </div > }
      { unknownError && <div> server unknownError: {JSON.stringify(unknownError)} </div >}
      { (submissionError || unknownError) &&
        <Button onClick={() => { dispatch(clearAdmindataApiError())  }}>
          Dismiss
        </Button>
      }
    </>
  )
}