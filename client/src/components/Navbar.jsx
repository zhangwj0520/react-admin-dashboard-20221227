import { useState } from 'react'
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material'
import FlexBetween from '@/components/FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '@/state'
import profileImage from '@/assets/profile.jpeg'
import { useTheme } from '@emotion/react'
import { AppBar, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'

const Navbar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
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
            {theme.palette.mode === 'dark'
              ? <DarkModeOutlined sx={{ fontSize: '25px' }} />
              : <LightModeOutlined sx={{ fontSize: '25px' }} />}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              xs={{
                dislpay: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              <Box
                alt="profile"
                borderRadius="50%"
                component="img"
                height="40px"
                src={profileImage}
                sx={{ objectFit: 'cover' }}
                width="40px"
              />
              <Box ml="10px" textAlign="left">
                <Typography
                  fontSize="0.85rem"
                  fontWeight="bold"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              onClose={handleClose}
              open={isOpen}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>

          </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
}

export default Navbar
