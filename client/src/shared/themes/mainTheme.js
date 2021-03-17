import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#875b20',
      light: '#ffd194',
      dark: '#32210b',
      // contrastText: '',
    },
    secondary: {
      main: '#662e91',
      // light: '',
      // dark: '',
      // contrastText: '',
    },
    background: {
      paper: '#ffedd6',
    },
    divider: '#875b20',
  },
  typography: {
    fontFamily:
      'Comfortaa, cursive, Arial, Helvetica, sans-serif, Raleway, Arial',
  },
  pagination: {
    pageSize: 20,
    rowsPerPage: [10, 20, 50],
  },
  sizes: {
    adminTableRowsHeight: {
      normal: 45,
      large: 123,
    }
  }
})

export default theme
