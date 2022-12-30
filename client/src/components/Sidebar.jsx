import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import {
  ChevronLeft, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined,
  PublicOutlined, PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined, PieChartOutlined,
  AdminPanelSettingsOutlined, TrendingUpOutlined,
  ChevronRightOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import PropTypes from 'prop-types'
import profileImage from '@/assets/profile.jpeg'

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Client Facing',
    icon: null,
  },
  {
    text: 'Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    text: 'Customers',
    icon: <Groups2Outlined />,
  },
  {
    text: 'Transactions',
    icon: <ReceiptLongOutlined />,
  },
  {
    text: 'Geography',
    icon: <PublicOutlined />,
  },
  {
    text: 'Sales',
    icon: null,
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutlined />,
  },
  {
    text: 'Management',
    icon: null,
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />,
  },
]

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  return (
    <Box>
      <Drawer
        anchor='left'
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: 'border-box',
            borderWidth: isNonMobile ? 0 : '2px',
            width: drawerWidth,
            transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s',
          },
        }}
        variant="persistent"
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box alignItems="center" display="flex" gap='0.5rem'>
                <Typography fontWeight="bold" variant='h4'>
                  ECOMVISION
                </Typography>
              </Box>
              {!isNonMobile &&
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft></ChevronLeft>
              </IconButton>}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                    {text}
                  </Typography>
                )
              }
              const lcText = text.toLowerCase()

              return (
                <ListItem disablePadding key={text}>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`)
                      setActive(lcText)
                    }}
                    sx={{
                      backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : 'transparent',
                      color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: '2rem',
                        color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                    <ChevronRightOutlined sx={{ ml: 'auto' }} />
                    )}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Box
          bottom="2rem"
          position="absolute"
        >
          <Divider />
          <FlexBetween
            gap="1rem"
            m="1.5rem 2rem 0 3rem"
            textTransform="none"
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
            <Box textAlign="left">
              <Typography
                fontSize="0.9rem"
                fontWeight="bold"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography>
            </Box>
            <SettingsOutlined
              sx={{
                color: theme.palette.secondary[300],
                fontSize: '25px ',
              }}
            />
          </FlexBetween>

        </Box>
      </Drawer>
    </Box>
  )
}
Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  drawerWidth: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
  isNonMobile: PropTypes.bool.isRequired,
}
// https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html

export default Sidebar
