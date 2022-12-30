import { Typography, Box, useTheme } from '@mui/material'
import PropTypes from 'prop-types'

const Header = ({ title, subtitle }) => {
  const theme = useTheme()
  return (
    <Box>
      <Typography
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: '5px' }}
        variant="h2"
      >
        {title}
      </Typography>
      <Typography color={theme.palette.secondary[300]} variant="h5">
        {subtitle}
      </Typography>
    </Box>
  )
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default Header
