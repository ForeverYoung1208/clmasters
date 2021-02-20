import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { Button } from '../../../components/Button/Button'
import { Form } from '../../../components/Form/Form'
import { validators } from '../../../shared/validators/baseValidator'
import { RenderFieldRadioGroup } from '../../../components/ReduxForm/RenderFieldRadioGroup/RenderFieldRadioGroupMUI'
import { Card, CardActions, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '1rem',
    borderRadius: 4,
    boxShadow: '0px 1px 4px 0px',
    padding: '1rem',
  },
}))

let OrderForm = ({ handleSubmit }) => {
  const { foundMasters } = useSelector(({ preorders }) => preorders)
  const classes = useStyles()
  const options = foundMasters?.map((master) => ({
    id: master.id,
    name: `${master.name}, rating:${master.rating} `,
  }))

  return (
    <Card className = {classes.root}>
      {foundMasters?.length > 0 ? (
        <Form onSubmit={handleSubmit}>
          <CardContent>
            <Field
              name="masterId"
              component={RenderFieldRadioGroup}
              options={options}
              className="order-form__radio-group"
              validate={[validators.required]}
            />
          </CardContent>

          <CardActions>
            <NavLink to="/masters/preorder" className="order-form__change-link">
              <Button variant="outlined">Change preorder data</Button>
            </NavLink>

            <Button type="submit">Submit</Button>
          </CardActions>
        </Form>
      ) : (
        <div>
          No free masters in the given city at specified time was found.
        </div>
      )}
    </Card>
  )
}

export default reduxForm({ form: 'orderForm' })(OrderForm)
