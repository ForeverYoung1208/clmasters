import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { reduxForm, Field } from 'redux-form'
import { Button } from '../../../../components/Button/Button'
import { RenderFieldInput } from '../../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'
import { RenderFieldSelect } from '../../../../components/ReduxForm/RenderFieldSelect/RenderFieldSelectMUI'

import { validators } from '../../../../shared/validators/baseValidator'
import { useDispatch, useSelector } from 'react-redux'
import { RenderFieldTime } from '../../../../components/ReduxForm/RenderFieldTime/RenderFieldTimeMUI'
import { fetchClocks } from '../../../../store/actions/clocks'
import { fetchMasters } from '../../../../store/actions/masters'
import { fetchUsers } from '../../../../store/actions/users'

let OrderForm = ({
  handleSubmit,
  order,
  initialize,
  pristine,
  submitting,
}) => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    initialize(order)
    dispatch(fetchClocks())
    dispatch(fetchMasters())
    dispatch(fetchUsers())
    // eslint-disable-next-line
  }, [dispatch, initialize])
  
  const users = useSelector(({ users }) => users?.data)
  const clocks = useSelector(({ clocks }) => clocks?.data)
  const masters = useSelector(({ masters }) => masters?.data)

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="onTime"
            label="On time"
            component={RenderFieldTime}
            validate={[validators.required]}
          />
        </div>

        <div>
          <Field
            name="clockId"
            label="Clock"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={clocks}
          />
        </div>
        
        <div>
          <Field
            name="masterId"
            label="Master"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={masters}
          />
        </div>

        <div>
          <Field
            name="userId"
            label="User"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={users}
          />
        </div>

        <div>
          <Field label="Comment" name="comment" component={RenderFieldInput} />
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
  form: 'order',
})(OrderForm)
