import { Box, Typography, useTheme } from '@mui/material'
import FlexBetween from './FlexBetween'

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme()
  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
      display="flex"
      flex="1 1 100%"
      flexDirection="column"
      gridColumn="span 2"
      gridRow="span 1"
      justifyContent="space-between"
      p="1.25rem 1rem"
    >
      <FlexBetween>
        <Typography sx={{ color: theme.palette.secondary[100] }} variant="h6">
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
        variant="h3"
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
          variant="h5"
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  )
}

export default StatBox
