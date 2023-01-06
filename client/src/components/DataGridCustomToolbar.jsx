import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          {/* 列配置 */}
          <GridToolbarColumnsButton />
          {/* 表格密度 */}
          <GridToolbarDensitySelector />
          {/* 数据导出 */}
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput)
                    setSearchInput('')
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="搜索..."
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ mb: '0.5rem', width: '15rem' }}
          value={searchInput}
          variant="standard"
        />
      </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar
