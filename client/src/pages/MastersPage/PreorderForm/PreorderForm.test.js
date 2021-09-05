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
import pretty from 'pretty'

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

describe('testing PreorderForm', () => {
  describe('testing rendering and some UI elements with initial selection of small clock type', () => {
    const store = mockStore(initialState)

    const container = mount(
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
        <Provider store={store}>
          <PreorderForm />
        </Provider>
      </MuiPickersUtilsProvider>
    )

    it('renders and has text "please provide some information" with class "MuiTypography-h6" ', () => {
      expect(container.find('.MuiTypography-h6').text()).toMatch(
        /please provide some information/
      )
    })

    it('first input (clock) field with id #mui-component-select-clockId has text "small" ', () => {
      let clockInput = container.find('#mui-component-select-clockId')
      expect(clockInput.text()).toMatch(/small/)
    })

    it('second input (city) field ("#mui-component-select-cityId") is empty (has unicode symbol u200B - ZeroWidthSpace) ', () => {
      let cityInput = container.find('#mui-component-select-cityId')
      expect(cityInput.text()).toEqual('\u200B')
    })
    
    it('second input (city) container (".MuiFormControl-root") has placeholder text "City"', () => {
      let cityInputContainer = container.find('.MuiFormControl-root')
      expect(cityInputContainer.at(1).text()).toMatch(/City/)
    })

  })

  describe('test form behaviour', () => {
    it('button Save is disabled when no data entered', () => {
      const emptyFormInintialState = {
        ...initialState,
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
            },
            initial: {
              onTime: '2021-09-04T09:00:00.000Z',
            },
            anyTouched: false,
          },
        },
      }
      const store = mockStore(emptyFormInintialState)
      const container = mount(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
          <Provider store={store}>
            <PreorderForm />
          </Provider>
        </MuiPickersUtilsProvider>
      )
      const buttonContainer = container.find('.MuiButtonBase-root')
      expect(buttonContainer.getDOMNode()).toBeDisabled()
    })

    it('shows "required" when got required sync error on first input (clock)', () => {
      const emptyFormInintialState = {
        ...initialState,
        form: {
          preorder: {
            syncErrors: {
              clockId: 'Required',
            },
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
      const store = mockStore(emptyFormInintialState)
      const container = mount(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
          <Provider store={store}>
            <PreorderForm />
          </Provider>
        </MuiPickersUtilsProvider>
      )
      const inputContainer = container.find('.MuiFormHelperText-root').at(0)
    })

    it('button Save is not disabled when all data entered', () => {
      const emptyFormInintialState = {
        ...initialState,
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
              onTime: '2021-09-05T21:00:00.000Z',
              clockId: 1,
              cityId: 1,
              name: 'Ihor Shcherbyna',
              email: 'siafin2010@gmail.com',
            },
            initial: {
              onTime: '2021-09-05T21:00:00.000Z',
            },
            fields: {
              clockId: {
                visited: true,
                touched: true,
              },
              cityId: {
                visited: true,
                touched: true,
              },
              name: {
                visited: true,
                touched: true,
              },
              email: {
                visited: true,
                touched: true,
              },
            },

            anyTouched: true,
          },
        },
      }
      const store = mockStore(emptyFormInintialState)
      const container = mount(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
          <Provider store={store}>
            <PreorderForm />
          </Provider>
        </MuiPickersUtilsProvider>
      )
      const buttonContainer = container.find('.MuiButtonBase-root')
      expect(buttonContainer.getDOMNode()).not.toBeDisabled()
    })
  })
})
