import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import PreorderForm from './PreorderForm'
import thunk from 'redux-thunk'

import { render, screen, userEvent, fireEvent } from '@testing-library/react'
// import {userEvent, fireEvent} from '@testing-library/react'

import DateFnsUtils from '@date-io/date-fns'
import { uk } from 'date-fns/locale'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const mockDispatchfn = jest.fn()

const initialState = {
  cities: {
    data: [
      {
        id: 1,
        isActive: true,
        name: 'city 1',
      },
    ],
  },

  clocks: {
    data: [
      {
        id: 1,
        type: 'small',
        repairTime: '01:00:00',
      },
    ],
  },
}

describe('testing PreorderForm', () => {
  beforeEach(() => {
    const props = {
      handleSubmit: jest.fn(),
    }
    render(
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
        <Provider store={mockStore(initialState)}>
          <PreorderForm {...props} dispatch={mockDispatchfn}></PreorderForm>
        </Provider>
      </MuiPickersUtilsProvider>
    )
  })

  it('renders and has text "please provide some information" with class "MuiTypography-h6" ', async () => {
    // const el = await screen.findByText(/please provide some information/)
    const el = screen.getByText(/please provide some information/)
    expect(el).toHaveClass('MuiTypography-h6')
  })

  it('requires name when it is empty', async () => {
    
    const el = document.querySelectorAll('[name=clockId]')[0]

    await fireEvent.change(
      el,
      {value: '1'}
    )
    console.log('[el.value]', el.value)
    
    await fireEvent.change(
      el,
      {
        target: { value: '2' },
      }
    )
    console.log('[el.value]', el.value)
    
  })
})
