import { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import Header from '@/components/Header'
import { useGetProductsQuery } from '@/state/api'
import OutletContent from '@/components/OutletContent'
import Loading from '@/components/Loading'
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,

}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          color={theme.palette.secondary[700]}
          gutterBottom
          sx={{ fontSize: 14 }}
        >
          {category}
        </Typography>
        <Typography component="div" variant="h5">
          {name}
        </Typography>
        <Typography color={theme.palette.secondary[400]} sx={{ mb: '1.5rem' }}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating readOnly value={rating} />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="small"
          variant="primary"
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        sx={{
          color: theme.palette.neutral[300],
        }}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>)
}

const Products = () => {
  const { data, isLoading } = useGetProductsQuery()
  const isNonMobile = useMediaQuery('(min-width:1000px')
  console.log('data =>  ', data)

  return (
    <OutletContent>
      <Header subtitle='see your list of products' title='PRODUCTS'></Header>
      {
        (data || !isLoading)
          ? <Box
              columnGap="1.33%"
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              justifyContent="space-between"
              mt="20px"
              rowGap="20px"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
          >
            {data.map(({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                _id={_id}
                category={category}
                description={description}
                key={_id}
                name={name}
                price={price}
                rating={rating}
                stat={stat}
                supply={supply}
              />))}
          </Box>
          : <Loading />
      }
    </OutletContent>
  )
}

export default Products
