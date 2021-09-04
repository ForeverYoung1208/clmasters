import React from 'react'
import { Provider } from 'react-redux'
import PreorderForm from './PreorderForm'
import thunk from 'redux-thunk'
import DateFnsUtils from '@date-io/date-fns'
import { uk } from 'date-fns/locale'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { shallow, mount, render } from 'enzyme'
import { reducer as formReducer } from 'redux-form'
import { compose, applyMiddleware, createStore } from 'redux'

import { Select } from '@material-ui/core'
import { act } from 'react-dom/test-utils'
import configureStore from 'redux-mock-store'

const mockDispatchfn = jest.fn()
const mockOnClickfn = jest.fn()
const mockStore = configureStore([thunk])

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
      {
        id: 2,
        type: 'medium',
        repairTime: '02:00:00',
      },
    ],
  },

  form: {
    preorder: {
      registeredFields: {
        clockId: {
          name: 'clockId',
          type: 'Field',
          count: 1,
        },
        cityId: {
          name: 'cityId',
          type: 'Field',
          count: 1,
        },
        name: {
          name: 'name',
          type: 'Field',
          count: 1,
        },
        email: {
          name: 'email',
          type: 'Field',
          count: 1,
        },
        onTime: {
          name: 'onTime',
          type: 'Field',
          count: 1,
        },
      },
      values: {
        onTime: '2021-09-04T09:00:00.000Z',
        clockId: 1,
      },
      initial: {
        onTime: '2021-09-04T09:00:00.000Z',
      },
      fields: {
        clockId: {
          visited: true,
          touched: true,
        },
      },
      anyTouched: true,
    },
  },
}

let container

describe('testing PreorderForm', () => {
  describe('testing rendering and some UI elements', () => {
    const store = mockStore(initialState)

    container = mount(
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
        <Provider store={store}>
          <PreorderForm />
        </Provider>
      </MuiPickersUtilsProvider>
    )

    // console.log('[container.debug({verbose:true})]', container.debug({ignoreProps:true}))

    it('renders and has text "please provide some information" with class "MuiTypography-h6" ', async () => {
      expect(container.find('.MuiTypography-h6').text()).toMatch(
        /please provide some information/
      )
    })

    it('renders and has fitst input (clock) has text "small" ', async () => {
      let clockInput = container.find('#mui-component-select-clockId')
      expect(clockInput.text()).toMatch(/small/)
    })
  })
})
