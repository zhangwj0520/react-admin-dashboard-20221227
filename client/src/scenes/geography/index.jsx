import { Box, useTheme } from '@mui/material'
import { useGetGeographyQuery } from '@/state/api'
import Header from '@/components/Header'
import OutletContent from '@/components/OutletContent'
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoData } from '@/state/geoData'
import Loading from '@/components/Loading'

const Geography = () => {
  const theme = useTheme()
  const { data } = useGetGeographyQuery()

  return (
    <OutletContent>
      <Header subtitle="Find where your users are located." title="GEOGRAPHY" />
      {data
        ? <Box
            border={`1px solid ${theme.palette.secondary[200]}`}
            borderRadius="4px"
            height="75vh"
            mt="40px"
        >
          <ResponsiveChoropleth
            borderColor="#ffffff"
            borderWidth={1.3}
            data={data}
            domain={[0, 60]}
            features={geoData.features}
            label="properties.name"
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 30,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      // itemTextColor: theme.palette.primary.alt,
                      // itemTextColor: '#000000',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            projectionRotation={[0, 0, 0]}
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
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
            unknownColor="#666666"
            valueFormat=".2s"
          />
        </Box>
        : (
          <Loading />
          )}
    </OutletContent>
  )
}

export default Geography
