import OutletContent from '@/components/OutletContent'
import Header from '@/components/Header'
import { Box } from '@mui/system'

import MonthlyChart from '@/components/MonthlyChart'

const Overview = () => {
  return (
    <OutletContent>
      <Header subtitle='Chart of monthlysales' title='MONTHLY SALES'></Header>
      <Box height="75vh">
        <MonthlyChart />
      </Box>
    </OutletContent>
  )
}

export default Overview
