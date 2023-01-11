import OutletContent from '@/components/OutletContent'
import Header from '@/components/Header'
import { Box } from '@mui/system'

import BreakdownChart from '@/components/BreakdownChart'

const Breakdown = () => {
  return (
    <OutletContent>
      <Header subtitle='Breakdown of Sales By Category' title='BREAKDOWN'></Header>
      <Box height="75vh">
        <BreakdownChart />
      </Box>
    </OutletContent>
  )
}

export default Breakdown
