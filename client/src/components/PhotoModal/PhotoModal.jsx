import { Box, makeStyles, Modal } from '@material-ui/core'
import React from 'react'
import { Cloudinary } from "@cloudinary/base";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  },
})

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  photoBig: {
    position: 'absolute',
    width: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    margin: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    overflow: 'auto',       
  },
}))

export const PhotoModal = ({ isOpen, closeHandler, photoPublicId }) => {
  const classes = useStyles()
  const bigPhoto = cld.image(photoPublicId)
  

  return (
    <Modal open={isOpen} onClose={closeHandler} className={classes.modal}>
      <Box variant="outlined" className={classes.photoBig}>
        <img src={bigPhoto.toURL()} alt='big clock' />
      </Box>
    </Modal>
  )
}
