import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import PreorderForm from './PreorderForm'
import thunk from 'redux-thunk'
import DateFnsUtils from '@date-io/date-fns'
import { uk } from 'date-fns/locale'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import pretty from 'pretty'
import { shallow, mount, render } from 'enzyme'

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
  const props = {
    handleSubmit: jest.fn(),
  }
  container = mount(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
      <Provider store={mockStore(initialState)}>
        <PreorderForm {...props} dispatch={mockDispatchfn}></PreorderForm>
      </Provider>
    </MuiPickersUtilsProvider>
  )

  it('renders and has text "please provide some information" with class "MuiTypography-h6" ', async () => {
    expect(container.find('.MuiTypography-h6').text()).toMatch(
      /please provide some information/
    )
  })
  
  it('requires name when it is empty', async () => {
    const inputs = container.find('input')
    console.log(inputs)
    
    for (let i of inputs) {
      console.log('[i====]', i)
    }
    // inputs.simulate("change", {
    //   target: { value: 1 }
    // })
    
    

    
    
  })
  
})
