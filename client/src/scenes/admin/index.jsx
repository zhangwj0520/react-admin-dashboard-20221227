import { useGetAdminsQuery } from '@/state/api'
import OutletContent from '@/components/OutletContent'
import Header from '@/components/Header'
import { useTheme, Box } from '@mui/material'
import CustomColumnMenu from '@/components/DataGridCustomColumnMenu'
import { DataGrid, zhCN } from '@mui/x-data-grid'

const Admin = () => {
  const theme = useTheme()
  const { data, isLoading } = useGetAdminsQuery()

  const columns = [
    {
      field: '_id',
      headerName: '序号',
      flex: 1,
    },
    {
      field: 'name',
      headerName: '姓名',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: '邮箱',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: '电话号码',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{2})(\d{4})(\d{4})/, '1$1****$3')
      },
    },
    {
      field: 'country',
      headerName: '国家',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: '地区',
      flex: 1,
    },
    {
      field: 'role',
      headerName: '角色',
      flex: 0.5,
    },
  ]

  return (
    <OutletContent>
      <Header subtitle='Managing admins and list of admins' title='ADMINS'></Header>
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
          rows={data || []}
        />
      </Box>
    </OutletContent>
  )
}

export default Admin
