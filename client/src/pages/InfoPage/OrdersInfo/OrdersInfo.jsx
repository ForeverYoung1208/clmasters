import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { PhotoModal } from '../../../components/PhotoModal/PhotoModal'
import PaymentBlock from '../../../components/PaymentBlock/PaymentBlock'

const EQUALITY_THRESHOLD = 0.009

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: '2rem',
    },
    heading: {
      padding: '1rem',
    },
    cellLabel: {
      fontWeight: 'bolder',
    },
    cellData: {},
    photoSmall: {
      cursor: 'pointer',
    },    
  }
})

export const OrdersInfo = ({ orders, heading, showPaymentInfo = true }) => {
  const classes = useStyles()
  const [photoPublicId, setPhotoPublicId] = useState(null)
  const [orderForPay, setOrderForPay] = useState(null)
  

  const fieldsToShow = useMemo(
    () => ({
      userName: 'Client name:',
      userEmail: 'Client email:',
      clockType: 'Clock Type:',
      masterName: 'Master:',
      masterCity: 'City:',
      onTimeStr: 'On Time:',
      comment: 'Comment',
      price: 'Price',
    }),
    []
  )
  
  return (
    <div>
      <Typography align="center" variant="h6" className={classes.heading}>
        {heading}
      </Typography>
      {orders?.map((order) => {
        order.onTimeStr = new Date(order.onTime).toLocaleString('uk')

        return (
          <Box key={order.id} className={classes.root}>
            <Typography align="center" variant="h6">
              {`Order # ${order.id}`}
            </Typography>

            <Table size="small">
              <TableBody>
                {Object.keys(fieldsToShow).map((field) => (
                  <TableRow key={field}>
                    <TableCell className={classes.cellLabel}>
                      {fieldsToShow[field]}
                    </TableCell>
                    <TableCell className={classes.cellData}>
                      {order[field]}
                    </TableCell>
                  </TableRow>
                ))}
                
                {showPaymentInfo && <TableRow>
                  <TableCell className={classes.cellLabel} >
                    Payed sum
                  </TableCell>
                  <TableCell className={classes.cellData} >
                    {order.payedSum || '0'}
                    &nbsp;
                    {(Math.abs(order.payedSum - order.price) > EQUALITY_THRESHOLD)
                      && <Button align="center" onClick={() => setOrderForPay(order)}>
                        make a payment
                        </Button>
                    }
                  </TableCell>
                </TableRow>}
                
                <TableRow>
                  <TableCell className={classes.cellLabel}>Photo</TableCell>
                  <TableCell className={classes.cellData}>
                    {order.thumbnailUrl ? (
                      <img
                        className={classes.photoSmall}
                        src={order.thumbnailUrl}
                        alt="Clock"
                        onClick={() => setPhotoPublicId(order.photoPublicId)}
                      />
                    ) : (
                      <Typography>Photo not found</Typography>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )
      })}
      <PhotoModal
        isOpen={!!photoPublicId}
        closeHandler={() => {
          setPhotoPublicId(null)
        }}
        photoPublicId={photoPublicId}
      />
      <PaymentBlock
        isOpen={!!orderForPay}
        closeHandler={() => {
          setOrderForPay(null)
        }}
        orderForPay = {orderForPay}
      />
    </div>
  )
}
