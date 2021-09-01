import React from 'react'
import { Provider } from 'react-redux'
import PreorderForm from './PreorderForm'
import thunk from 'redux-thunk'
import DateFnsUtils from '@date-io/date-fns'
import { uk } from 'date-fns/locale'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { shallow, mount, render } from 'enzyme'
import { reducer as formReducer } from 'redux-form';
import { compose, applyMiddleware, createStore } from 'redux'

import { Select } from '@material-ui/core'

const mockDispatchfn = jest.fn()
const mockOnClickfn = jest.fn()

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
    const store = createStore(
      formReducer,
      initialState,
      compose(applyMiddleware(thunk))
    )

    const props = {
      handleSubmit: jest.fn(),
      dispatch: { mockDispatchfn },
      onClick: mockOnClickfn,

    }

    container = mount(
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uk}>
        <Provider store={store}>
          <PreorderForm
            {...props}
            initialValues={{ clockId: 1 }}
          />
        </Provider>
      </MuiPickersUtilsProvider>
    )

  });
  

  it('renders and has text "please provide some information" with class "MuiTypography-h6" ', async () => {
    expect(container.find('.MuiTypography-h6').text()).toMatch(
      /please provide some information/
    )
  })
  
  it('requires name when it is empty', async () => {
    
    let clockInput = container.find('input').at(0)
    
    
    ////// doesn't work
    // clockInput.props().onChange({target:{value:1}})

    ////// doesn't work also
    clockInput.simulate('click')
    clockInput.simulate('keypress', {keyCode:40})
    clockInput.simulate('keypress', {keyCode:13})
    
    console.log('[clockInput]', clockInput.debug({verbose:true}))
    
    // [clockInput] <input value="" name="clockId" aria-hidden={true} onChange={[Function: handleChange]}.....
    
  })

   
  
})
