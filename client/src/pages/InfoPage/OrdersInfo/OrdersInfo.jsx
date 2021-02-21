import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: '1rem',
    },
    heading: {
      padding: '1rem'
    },
    cellLabel: {
      fontWeight: 'bolder',
    },
    cellData: {},
  }
})

export const OrdersInfo = ({ orders, heading }) => {
  const classes = useStyles()
  return (
    <div>
      <Typography align="center" variant="h6" className={classes.heading}>
        {heading}
      </Typography>
      {orders?.map(
        ({
          id,
          onTime: onTimeStr,
          userEmail,
          userName,
          clockType,
          masterName,
          masterCity,
          comment,
        }) => {
          const onTime = new Date(onTimeStr)

          return (
            <Box key={id} className={classes.root}>
                <Typography align="center" variant="h6">
                  {`Order # ${id}`}
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Client name:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {userName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Client email:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {userEmail}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Clock Type:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {clockType}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Master:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {masterName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>City:</TableCell>
                      <TableCell className={classes.cellData}>
                        {masterCity}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        On Time:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {onTime?.toLocaleString('uk')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Comment:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {comment}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Box>
          )
        }
      )}
    </div>
  )
}
