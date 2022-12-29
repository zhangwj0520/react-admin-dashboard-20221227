import { useState } from 'react'
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined
} from '@mui/icons-material'
import FlexBetween from '@/components/FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '@/state'
import profileImage from '@/assets/profile.jpeg'
import { useTheme } from '@emotion/react'
import { AppBar, IconButton, InputBase, Toolbar } from '@mui/material'
import PropTypes from 'prop-types'

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder='Search...'></InputBase>
            <IconButton>
              <Search></Search>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dart'
              ? <DarkModeOutlined sx={{ fontSize: '25px' }} />
              : <DarkModeOutlined sx={{ fontSize: '25px' }} />}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired
}

export default Navbar
