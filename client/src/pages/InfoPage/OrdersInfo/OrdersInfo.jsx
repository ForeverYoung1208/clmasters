import {
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => {
  console.log('[theme]', theme)
  return {
    root: {
      marginBottom: '1rem',
    },
    cellLabel: {},
    cellData: {},
  }
})

export const OrdersInfo = ({ orders, heading }) => {
  const classes = useStyles()
  return (
    <div>
      <Typography align="center" variant="h5" gutterBottom>
        {heading}
      </Typography>
      {orders?.map(
        ({ id, onTime: onTimeStr, user, clock, master, comment }) => {
          const onTime = new Date(onTimeStr)

          return (
            <Card key={id} className={classes.root}>
              <CardContent>
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
                        {user?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Client email:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {user?.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Clock Type:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {clock?.type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>
                        Master:
                      </TableCell>
                      <TableCell className={classes.cellData}>
                        {master?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellLabel}>City:</TableCell>
                      <TableCell className={classes.cellData}>
                        {master?.city?.name}
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
              </CardContent>
            </Card>
          )
        }
      )}
    </div>
  )
}
