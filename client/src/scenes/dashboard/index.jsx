import FlexBetween from '@/components/FlexBetween'
import Header from '@/components/Header'
import OutletContent from '@/components/OutletContent'
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from '@/components/BreakdownChart'
import OverviewChart from '@/components/OverviewChart'
import { useGetDashboardQuery } from '@/state/api'
import StatBox from '@/components/StatBox'

function Dashboard () {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]
  return (
    <OutletContent>
      <FlexBetween>
        <Header subtitle='Welcome to your dashboard' title='DASHBOARD'></Header>
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        display="grid"
        gap="20px"
        gridAutoRows="160px"
        gridTemplateColumns="repeat(12, 1fr)"
        mt="20px"
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          description="Since last month"
          icon={<Email
            sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
          />}
          increase="+14%"
          title="Total Customers"
          value={data && data.totalCustomers}
        />
        <StatBox
          description="Since last month"
          icon={<PointOfSale
            sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
          />}
          increase="+21%"
          title="Sales Today"
          value={data && data.todayStats.totalSales}
        />
        <Box
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          gridColumn="span 8"
          gridRow="span 2"
          p="1rem"
        >
          <OverviewChart isDashboard={true} view="sales" />
        </Box>
        <StatBox
          description="Since last month"
          icon={<PersonAdd
            sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
          />}
          increase="+5%"
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
        />
        <StatBox
          description="Since last month"
          icon={<Traffic
            sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
          />}
          increase="+43%"
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading || !data}
            rows={(data && data.transactions) || []}
          />
        </Box>
        <Box
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          gridColumn="span 4"
          gridRow="span 3"
          p="1.5rem"
        >
          <Typography sx={{ color: theme.palette.secondary[100] }} variant="h6">
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            fontSize="0.8rem"
            p="0 0.6rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>

    </OutletContent>
  )
}

export default Dashboard
