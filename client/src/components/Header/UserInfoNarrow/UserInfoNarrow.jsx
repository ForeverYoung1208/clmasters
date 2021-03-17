import { Box, IconButton, Popover, Typography } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import React, { useCallback, useState } from 'react'
import { Button } from '../../Button/Button';

const UserInfoNarrow = ({ handleLogout, currentUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileMenuOpen = useCallback(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, [setAnchorEl])

  const handleProfileMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl])
  
  
  return (
    <>
      <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit">
        <AccountCircle />
      </IconButton>
      {!!anchorEl && (
        <Popover 
          id="profile-menu-widescreen"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box p={2} display='flex' flexDirection='column' alignItems='center'>
            <Typography gutterBottom>{currentUser.email}</Typography>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Popover>        
      )}
    </>
  )
}

export default UserInfoNarrow
