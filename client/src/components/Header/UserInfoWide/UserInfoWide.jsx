import { IconButton, MenuItem, Typography } from '@material-ui/core'
import { Menu as DropDownMenu } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'
import React, { useCallback, useState } from 'react'

const UserInfoWide = ({ handleLogout, currentUser }) => {
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
        <Typography variant="caption" display="block">
          {currentUser.email}
        </Typography>
      </IconButton>
      {!!anchorEl && (
        <DropDownMenu
          id="profile-menu-widescreen"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </DropDownMenu>
      )}
    </>
  )
}

export default UserInfoWide
