import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import Layout from '@/scenes/layout'
import Dashboard from '@/scenes/dashboard'
import Products from '@/scenes/products'
import Customers from '@/scenes/customers'
import Transactions from '@/scenes/transactions'
import Geography from '@/scenes/geography'
import Overview from '@/scenes/overview'
import Daily from '@/scenes/daily'
import Monthly from '@/scenes/monthly'
import Breakdown from '@/scenes/breakdown'
import Admin from '@/scenes/admin'
import Performance from '@/scenes/performance'

function App () {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<Navigate a replace to="/dashboard" />} path="/" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Products />} path="/products" />
              <Route element={<Customers />} path="/customers" />
              <Route element={<Transactions />} path="/transactions" />
              <Route element={<Geography />} path="/geography" />
              <Route element={<Overview />} path="/overview" />
              <Route element={<Daily />} path="/daily" />
              <Route element={<Monthly />} path="/monthly" />
              <Route element={<Breakdown />} path="/breakdown" />
              <Route element={<Admin />} path="/admin" />
              <Route element={<Performance />} path="/performance" />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
