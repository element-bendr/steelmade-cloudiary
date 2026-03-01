import { groq } from 'next-sanity'

// Fetch all available categories (e.g. for generating static paths or navigation)
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    "id": slug.current,
    title,
    description,
    "imageUrl": mainImage.asset->url
  }
`

// Fetch a single category by its slug
export const categoryByIdQuery = groq`
  *[_type == "category" && slug.current == $categoryId][0] {
    _id,
    "id": slug.current,
    "name": title,
    title,
    description,
    "imageUrl": mainImage.asset->url
  }
`

// Fetch all products that belong to a specific category, grouped by series.
export const productsByCategoryQuery = groq`
  *[_type == "product" && category == $categoryId] {
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
    series
  }
`

// Legacy compatibility for fetching by series matches
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
  *[_type == "product" && category == $category && series == $seriesTitle && slug.current == $productId][0] {
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
