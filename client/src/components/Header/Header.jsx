import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import logoImg from '../../img/glow_clock2.png'
import Menu from './Menu/Menu'

import withCurrentUser from '../../HOC/withCurrentUser'
import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'
import { authLogoutUser } from '../../store/actions/auth'
import { useDispatch } from 'react-redux'
import UserInfoWide from './UserInfoWide/UserInfoWide'
import UserInfoNarrow from './UserInfoNarrow/UserInfoNarrow'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logeImg: {
    height: theme.spacing(9),
    width: theme.spacing(9),
  },
  logoText: {
    width: theme.spacing(9),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    flexGrow: 1,
  },
}))

const Header = ({ currentUser }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const largerMD = useMediaQuery(theme.breakpoints.up('md'));
  
  const handleLogout = useCallback(() => {
    dispatch(authLogoutUser())
  }, [dispatch])
  
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Box className={classes.logo}>
          <img className={classes.logeImg} src={logoImg} alt="logo" />
          <div className={classes.logoText}> Clock Masters</div>
        </Box>

        <Menu className={classes.menu} />

        {currentUser?.email ? (
          largerMD
            ? <UserInfoWide handleLogout={handleLogout} currentUser={currentUser} />
            : <UserInfoNarrow handleLogout={handleLogout} currentUser={currentUser} />
        ) : (
          <div>&nbsp;</div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default withCurrentUser(Header)
