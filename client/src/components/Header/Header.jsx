import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'

import logoImg from '../../img/glow_clock2.png'
import Menu from './Menu/Menu'
import UserInfo from './UserInfo/UserInfo'

// import './Header.scss';
import withCurrentUser from '../../HOC/withCurrentUser'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
} from '@material-ui/core'

const handleProfileMenuOpen = (event) => {
  console.log('[event.target]', event.target)
}

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
    alignItems:'center',
  },
  logeImg: {
    height: theme.spacing(9),
    width: theme.spacing(9),
  },
  logoText: {
    width: theme.spacing(9)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    flexGrow: 1,
  },
}))

const ProfileMenu = () => {
  return <UserInfo />
}

const Header = ({ currentUser }) => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Box className={classes.logo}>
          <img className={classes.logeImg} src={logoImg} alt="logo" />
          <div className={classes.logoText}> Clock Masters</div>
        </Box>

        <Menu className={classes.menu} />

        {currentUser && (
          <IconButton
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

// const Header = (props) => {
//   const {currentUser} = props

//   return (
//       <div className="header">
// <div className="header__logo">
//   <img src={logoImg} alt="logo"/>
//   <div className="caption"> Clock Masters</div>
// </div>
//         <div className="header__menu">
//           <Menu/>
//         </div>
//         <div className="header__user-info">
//             <UserInfoAnimated key='userInfo' isShown = {!!currentUser}/>
//         </div>
//       </div>
//   );
// };

export default withCurrentUser(Header)
