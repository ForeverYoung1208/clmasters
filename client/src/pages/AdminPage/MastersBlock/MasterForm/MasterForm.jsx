import React, { useEffect, useMemo } from 'react'
import { Box } from '@material-ui/core'
import { reduxForm, Field } from 'redux-form'
import { Button } from '../../../../components/Button/Button'
import { RenderFieldInput } from '../../../../components/ReduxForm/RenderFieldInput/RenderFieldInputMUI'
import { RenderFieldSelect } from '../../../../components/ReduxForm/RenderFieldSelect/RenderFieldSelectMUI'

import { validators } from '../../../../shared/validators/baseValidator'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCities } from '../../../../store/actions/cities'
import { RenderFieldCheckbox } from '../../../../components/ReduxForm/RenderFieldCheckbox/RenderFieldCheckboxMUI'

export const RATINGS = [
  { id: '1', name: 'rating 1' },
  { id: '2', name: 'rating 2' },
  { id: '3', name: 'rating 3' },
  { id: '4', name: 'rating 4' },
  { id: '5', name: 'rating 5' },
]

let MasterForm = ({
  handleSubmit,
  master,
  initialize,
  pristine,
  submitting,
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    initialize(master)
    dispatch(fetchCities())
    // eslint-disable-next-line
  }, [])

  const cities = useSelector(({ cities }) => cities?.data)
  const citiesOptions = useMemo(() => {
    return cities.filter((city) => city.isActive)
  }, [cities])

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            label="Name"
            component={RenderFieldInput}
            validate={[validators.required]}
          />
        </div>

        <div>
          <Field
            name="cityId"
            label="City"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={citiesOptions}
          />
        </div>

        <div>
          <Field
            name="rating"
            label="Rating"
            component={RenderFieldSelect}
            validate={[validators.required]}
            options={RATINGS}
          />
        </div>

        <div>
          <Field
            label="Hour rate"
            name="hourRate"
            component={RenderFieldInput}
            validate={validators.isDecimal}
          />
        </div>

        <div>
          <Field label="Comment" name="comment" component={RenderFieldInput} />
        </div>

        <div>
          <Field
            name="isActive"
            label="is Active?"
            component={RenderFieldCheckbox}
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
  form: 'master',
})(MasterForm)
