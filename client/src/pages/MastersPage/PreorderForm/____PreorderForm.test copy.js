import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import PreorderForm from './PreorderForm'
import thunk from 'redux-thunk'
import DateFnsUtils from '@date-io/date-fns'
import { uk } from 'date-fns/locale'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import pretty from "pretty";

// import { render, screen, userEvent, fireEvent } from '@testing-library/react'
// import {userEvent, fireEvent} from '@testing-library/react'

import { act } from 'react-dom/test-utils'

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

let container

describe('testing PreorderForm', () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  it('renders and has text "please provide some information" with class "MuiTypography-h6" ', async () => {
    act(() => {
      const props = {
        handleSubmit: jest.fn(),
      }
      render(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
          <Provider store={mockStore(initialState)}>
            <PreorderForm {...props} dispatch={mockDispatchfn}></PreorderForm>
          </Provider>
        </MuiPickersUtilsProvider>,
        container
      )
      
      container.
      
      console.log('[container]', pretty(container.innerHTML))
      
    })

    
    
    
    
    
  })

  // it('requires name when it is empty', async () => {
    // const [clockSelect, citySelect, nameInput, emailInput, datePicker] = container.querySelectorAll('input')
    // ReactTestUtils.Simulate.keyDown(inputs[0], {key: "Enter", keyCode: 13, which: 13});

  // })
})
