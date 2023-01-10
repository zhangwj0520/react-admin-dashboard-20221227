import OutletContent from '@/components/OutletContent'
import Loading from '@/components/Loading'
import Header from '@/components/Header'
import { useState } from 'react'
import { Box } from '@mui/system'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import DailyChart from '@/components/DailyChart'
import { zhCN } from 'date-fns/esm/locale'
import { addMonths } from 'date-fns'

registerLocale('zhCN', zhCN)

const Overview = () => {
  const [startDate, setStartDate] = useState(new Date('2021-02-01'))
  const [endDate, setEndDate] = useState(addMonths(new Date('2021-02-01'), 1))

  return (
    <OutletContent>
      <Header subtitle='Chart of daily sales' title='DAILY SALES'></Header>
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              endDate={endDate}
              locale="zhCN"
              onChange={(date) => setStartDate(date)}
              selected={startDate}
              selectsStart
              startDate={startDate}
            />
          </Box>
          <Box>
            <DatePicker
              endDate={endDate}
              locale="zhCN"
              minDate={startDate}
              onChange={(date) => setEndDate(date)}
              selected={endDate}
              selectsEnd
              startDate={startDate}
            />
          </Box>
        </Box>
        <DailyChart endDate={endDate} startDate={startDate} />
      </Box>
    </OutletContent>
  )
}

export default Overview
