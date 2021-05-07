import React, { useEffect, useMemo } from 'react'
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
import { addHours, startOfHour } from 'date-fns'
import OrderToGoogleCalendarBtn from '../../../../components/OrderToGoogleCalendarBtn/OrderToGoogleCalendarBtn'

const ONE_HOUR_MSEC = new Date('1970-01-01T01:00:00Z')

let OrderForm = ({
  handleSubmit,
  order,
  initialize,
  pristine,
  submitting,
  change: changeFormData,
}) => {
  const nowHour = useMemo(() => startOfHour(addHours(new Date(), 1)), [])
  const dispatch = useDispatch()

  useEffect(() => {
    initialize({
      ...order,
      onTime: order?.onTime || nowHour,
    })
    dispatch(fetchClocks())
    dispatch(fetchMasters())
    dispatch(fetchUsers())
    // eslint-disable-next-line
  }, [])

  const users = useSelector(({ users }) => users?.data)
  const clocks = useSelector(({ clocks }) => clocks?.data)
  const masters = useSelector(({ masters }) => masters?.data)
  const [
    selectedMasterId,
    selectedClockId,
  ] = useSelector(({ form: { order } }) => [
    order?.values?.masterId,
    order?.values?.clockId,
  ])

  const clocksOptions = useMemo(() => {
    return clocks.map((clock) => ({
      ...clock,
      type: `${clock.type} (time: ${clock.repairTime})`,
    }))
  }, [clocks])

  const mastersOptions = useMemo(() => {
    return masters
      .filter((master) => master.isActive)
      .map((master) => ({
        ...master,
        name: `${master.name} (hour rate: ${master.hourRate})`,
      }))
  }, [masters])

  useEffect(() => {
    const selectedMaster = masters.find((m) => +m.id === selectedMasterId)
    const selectedClock = clocks.find((c) => +c.id === selectedClockId)
    if (selectedMaster?.hourRate && selectedClock?.repairTime) {
      const price =
        Math.round(
          (selectedMaster.hourRate / ONE_HOUR_MSEC) *
            new Date(`1970-01-01T${selectedClock.repairTime}Z`) *
            100
        ) / 100

      changeFormData('price', price)
    }
  }, [selectedMasterId, selectedClockId, masters, clocks, changeFormData])

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="clockId"
            label="Clock"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={clocksOptions}
          />
        </div>

        <div>
          <Field
            name="masterId"
            label="Master"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={mastersOptions}
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
          <Field
            name="onTime"
            label="On time"
            component={RenderFieldTime}
            validate={[validators.required]}
          />
        </div>

        <div>
          <Field
            label="Price (calculated)"
            name="price"
            component={RenderFieldInput}
            disabled={true}
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
        <Box display="flex" justifyContent="center">
          {/* <OrderToGoogleCalendarBtn order={order} /> */}
        </Box>
      </form>
    </Box>
  )
}
export default reduxForm({
  form: 'order',
})(OrderForm)
