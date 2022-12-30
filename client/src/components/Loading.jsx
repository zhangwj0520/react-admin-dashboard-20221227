import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (<Box
    alignItems="center"
    display="flex"
    flexGrow={1}
    justifyContent="center"
  >
    <CircularProgress />
  </Box>)
}

export default Loading
