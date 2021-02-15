import { Box, makeStyles, Typography } from '@material-ui/core'
import { ChevronLeftTwoTone } from '@material-ui/icons'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Button } from '../../../components/Button/Button'
import { RenderFieldInput } from '../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'
import { RenderFieldSelect } from '../../../components/ReduxForm/RenderFieldSelect/RenderFieldSelectMUI'
import { RenderFieldTime } from '../../../components/ReduxForm/RenderFieldTime/RenderFieldTimeMUI'
import { validators } from '../../../shared/validators/baseValidator'
import { fetchCities } from '../../../store/actions/cities'
import { fetchClocks } from '../../../store/actions/clocks'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '1rem',
    borderRadius: 4,
    boxShadow: '0px 1px 4px 0px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
}))

let PreorderForm = ({
  handleSubmit,
  // preorder,
  initialize,
  pristine,
  submitting,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCities())
    dispatch(fetchClocks())
  }, [dispatch])

  const cities = useSelector(({ cities }) => cities?.data)
  const clocks = useSelector(({ clocks }) => clocks?.data)

  // TODO: implement preorder redux state
  // const preorder = useSelector(({ preorder }) => preorder)
  // temporary:
  const preorder = useMemo(
    () => ({
      name: '',
      email: '',
      onTime: '',
      clockTypeId: '',
      cityId: '',
    }),
    []
  )
  ////

  useEffect(() => {
    initialize(preorder)
    // eslint-disable-next-line
  }, [])
  
  const classes = useStyles()

  return (
    <Box
      className={classes.root}
    >
      <Typography variant='h5'>
        To find a master, please provide some information:
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="clockId"
            label="Clock Type"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={clocks}
          />
        </div>

        <div>
          <Field
            name="cityId"
            label="City"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={cities}
          />
        </div>

        <div>
          <Field
            label="Your name"
            name="name"
            component={RenderFieldInput}
            validate={[validators.required, validators.minLength2]}
          />
        </div>
        <div>
          <Field
            label="Your e-mail"
            name="email"
            component={RenderFieldInput}
            validate={[validators.required, validators.isEmail]}
          />
        </div>

        <div>
          <Field
            name="onTime"
            label="Desired time"
            component={RenderFieldTime}
            validate={[validators.required]}
          />
        </div>

        <Box display="flex" justifyContent="center">
          <Button
            color="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}
export default reduxForm({
  form: 'preorder',
})(PreorderForm)
