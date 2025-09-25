const rockSeries = {
  id: 'rock-series',
  name: 'Rock Series Workstation',
  description: 'The Rock Series Workstation features rugged steel leg designs and a robust look for high-performance workspaces.',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355063/steelmade/workstations/desk%20based%20workstation%20legs/rock-series1.png',
  gallery: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355063/steelmade/workstations/desk%20based%20workstation%20legs/rock-series1.png', alt: 'Rock Series Workstation 1' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355062/steelmade/workstations/desk%20based%20workstation%20legs/rock-series2.png', alt: 'Rock Series Workstation 2' }
  ],
  variants: [
    {
      variantId: 'rock-series1',
      variantName: 'Rock Series 1',
      name: 'Rock Series Workstation 1',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355063/steelmade/workstations/desk%20based%20workstation%20legs/rock-series1.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Rock'
      }
    },
    {
      variantId: 'rock-series2',
      variantName: 'Rock Series 2',
      name: 'Rock Series Workstation 2',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355062/steelmade/workstations/desk%20based%20workstation%20legs/rock-series2.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Rock'
      }
    }
  ],
  features: [
    'Rugged steel leg designs',
    'Robust look',
    'High-performance workspace',
    'Easy assembly'
  ],
  specifications: {
    'Material': 'Steel, engineered wood',
    'Dimensions': 'Customizable',
    'Warranty': '3 years'
  }
};
export default rockSeries;
