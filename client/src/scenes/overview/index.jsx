import OutletContent from '@/components/OutletContent'
import Header from '@/components/Header'
import { useState } from 'react'
import { Box } from '@mui/system'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import OverviewChart from '@/components/OverviewChart'

const Overview = () => {
  const [view, setView] = useState('units')

  return (
    <OutletContent>
      <Header subtitle='Overview of general revenue and profit' title='OVERVIEW'></Header>
      <Box height="75vh">
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>
            view
          </InputLabel>
          <Select label="View" onChange={(e) => setView(e.target.value)} value={view}>
            <MenuItem value="sales">销售额</MenuItem>
            <MenuItem value="units">销售量</MenuItem>
          </Select>

        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </OutletContent>
  )
}

export default Overview
