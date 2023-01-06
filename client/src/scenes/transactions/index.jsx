import Header from '@/components/Header'
import OutletContent from '@/components/OutletContent'
import { useGetTransactionsQuery } from '@/state/api'
import { useTheme, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import DataGridCustomToolbar from '@/components/DataGridCustomToolbar'
import dayjs from 'dayjs'
import { format } from 'date-fns'

const Transactions = () => {
  const theme = useTheme()
  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('1')

  const [searchInput, setSearchInput] = useState('')
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

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
      headerName: 'CreatedAt1',
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm:ss'),
    //   renderCell: ({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss'),
      //   valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm:ss Z'),
    //   valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'createdAt2',
      headerName: 'CreatedAt2',
      type: 'dateTime',
      flex: 1,
      //   renderCell: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm:ss'),
      //   renderCell: (params) => format(new Date(params.row.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      renderCell: (params) => format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      //   valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm:ss Z'),
    //   valueGetter: ({ value }) => value && new Date(value),
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

  console.log('useGetTransactionsQuery-data', data)
  return (
    <OutletContent>
      <Header subtitle='Entire list of transactions' title='TRANSACTIONS'></Header>
      <Box
        height="80vh"
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
        //   components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          getRowId={(row) => row._id}
          loading={isLoading || !data}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          page={page}
          pageSize={pageSize}
          pagination
          paginationMode="server"
          rowCount={(data && data.total) || 0}
          rows={(data && data.transactions) || []}
          rowsPerPageOptions={[20, 50, 100]}
          sortingMode="server"
        />
      </Box>
    </OutletContent>
  )
}

export default Transactions
