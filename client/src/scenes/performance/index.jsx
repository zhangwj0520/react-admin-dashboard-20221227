import { useGetUserPerformanceQuery } from '@/state/api'
import { useSelector } from 'react-redux'
import OutletContent from '@/components/OutletContent'
import Header from '@/components/Header'
import { useTheme, Box } from '@mui/material'
import CustomColumnMenu from '@/components/DataGridCustomColumnMenu'
import { DataGrid, zhCN } from '@mui/x-data-grid'

const Performance = () => {
  const theme = useTheme()
  const userId = useSelector((state) => state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId)

  const columns = [
    {
      field: '_id',
      headerName: '序号',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: '用户ID',
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
      <Header subtitle='Track your Affiliate Sales Performance Here' title='PERFORMANCE'></Header>
      <Box
        height="75vh"
        mt="40px"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
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
            backgroundColor: theme.palette.primary.light,
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
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
          getRowId={(row) => row._id}
          loading={isLoading || !data}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          rows={(data && data.sales) || []}
        />
      </Box>
    </OutletContent>
  )
}

export default Performance
