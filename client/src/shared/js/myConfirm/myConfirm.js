import { confirmAlert } from 'react-confirm-alert'
import './myConfirm.scss'

export const myCofirm = ({
  title = 'Confirm your action',
  message = 'Are you sure?',
  onAgree = () => console.log('YES'),
  onCancel = () => console.log('NO'),
  }) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Yes',
        onClick: onAgree
      },
      {
        label: 'No',
        onClick: onCancel
      }
    ]
  })
}