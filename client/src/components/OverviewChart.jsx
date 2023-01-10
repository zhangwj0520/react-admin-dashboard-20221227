import { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@mui/material'
import { useGetSalesQuery } from '@/state/api'
import Loading from './Loading'

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme()
  const { data, isLoading } = useGetSalesQuery()
  console.log('data =>  ', data)

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return []
    const { monthlyData } = data
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
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales
        const curUnits = acc.units + totalUnits

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ]
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ]

        return { sales: curSales, units: curUnits }
      },
      { sales: 0, units: 0 },
    )

    return [[totalSalesLine], [totalUnitsLine]]
  }, [data])

  return (
    <>
      {!data || isLoading
        ? <Loading />
        : <ResponsiveLine
            axisBottom={{
              format: (v) => {
                if (isDashboard) return v.slice(0, 3)
                return v
              },
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? '' : 'Month',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard
                ? ''
                : `Total ${view === 'sales' ? 'Revenue' : 'Units'} for Year`,
              legendOffset: -60,
              legendPosition: 'middle',
            }}
            axisRight={null}
            axisTop={null}
            curve="catmullRom"
            data={view === 'sales' ? totalSalesLine : totalUnitsLine}
            enableArea={isDashboard}
            enableGridX={false}
            enableGridY={false}
            legends={!isDashboard
              ? [
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: -40,
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
                ]
              : undefined}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
