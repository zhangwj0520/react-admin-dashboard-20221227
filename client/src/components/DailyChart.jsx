import { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@mui/material'
import { useGetSalesQuery } from '@/state/api'
import Loading from './Loading'

const OverviewChart = ({ startDate, endDate }) => {
  const theme = useTheme()
  const { data, isLoading } = useGetSalesQuery()
  console.log('data =>  ', data)

  const [formattedData] = useMemo(() => {
    if (!data) return []

    const { dailyData } = data
    const totalSalesLine = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [],
    }
    const totalUnitsLine = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [],
    }

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date)
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf('-') + 1)

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ]
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ]
      }
    })

    const formattedData = [totalSalesLine, totalUnitsLine]
    return [formattedData]
  }, [data, startDate, endDate])

  return (
    <>
      {!data || isLoading
        ? <Loading />
        : <ResponsiveLine
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Month',
              legendOffset: 60,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            axisRight={null}
            axisTop={null}
            colors={{ datum: 'color' }}
            curve="catmullRom"
            data={formattedData}
            enableGridX={false}
            enableGridY={false}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            pointBorderColor={{ from: 'serieColor' }}
            pointBorderWidth={2}
            pointColor={{ theme: 'background' }}
            pointLabelYOffset={-12}
            pointSize={10}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            useMesh={true}
            xScale={{ type: 'point' }}
            yFormat=" >-.2f"
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
        />}
    </>
  )
}

export default OverviewChart
