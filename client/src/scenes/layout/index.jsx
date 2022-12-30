import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

import { useGetUserQuery } from '@/state/api'

const drawerWidth = '250px'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, type }) => {
    return ({
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      // padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: type === 'pc' ? `-${drawerWidth}` : 0,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  },
)

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile)
  const userId = useSelector(state => state.global.userId)

  const { data } = useGetUserQuery(userId)

  useEffect(() => {
    setIsSidebarOpen(isNonMobile)
  }, [isNonMobile])

  return (
    <Box
      display={isNonMobile ? 'flex' : 'block'}
      heigt='100%'
      width="100%"
    >
      <Sidebar
        drawerWidth={drawerWidth}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={data || {}}
      />
      <Main open={isSidebarOpen} type={isNonMobile ? 'pc' : 'mobile'} >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={data || {}}
        />
        <Outlet flexGrow={1} />
      </Main>

    </Box>
  )
}

export default Layout
