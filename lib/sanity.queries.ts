import { groq } from 'next-sanity'

// Query to get products by category and series
export const productsBySeriesQuery = groq`
  *[_type == "product" && category == $category && series match $seriesTitle] {
    _id,
    name,
    "id": slug.current,
    "imageUrl": mainImage.asset->url,
    description,
    features,
    specifications[]{
      name,
      value
    },
    category,
    "seriesId": $seriesId
  }
`

// Query to get a single product by category, series and slug
export const productByIdQuery = groq`
  *[_type == "product" && category == $category && series match $seriesTitle && slug.current == $productId][0] {
    _id,
    name,
    "id": slug.current,
    "imageUrl": mainImage.asset->url,
    description,
    features,
    specifications[]{
      name,
      value
    },
    category,
    "seriesId": $seriesId
  }
`
