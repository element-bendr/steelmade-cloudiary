const marvelWorkstation = {
  id: 'marvel-workstation',
  name: 'Marvel Series Workstation',
  description: 'A modular desk-based workstation from the Marvel Series, designed for modern productivity and style.',
  category: 'workstations',
  seriesId: 'modular-furniture',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series01.png',
  features: [
    'Modular design',
    'Durable steel legs',
    'Spacious work surface',
    'Modern aesthetics'
  ],
  specifications: {
    'Material': 'Steel, engineered wood',
    'Dimensions': 'Customizable',
    'Warranty': '3 years'
  },
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series01.png',
      alt: 'Marvel Series Desk-Based Workstation',
      width: 1200,
      height: 800
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series02.png',
      alt: 'Marvel Series Desk-Based Workstation Variant 02',
      width: 1200,
      height: 800
    }
  ],
  variants: [
    {
      variantId: 'marvel-series01',
      variantName: 'Marvel Series 01',
      name: 'Marvel Series Desk-Based Workstation',
      description: 'Standard Marvel Series workstation with steel legs.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series01.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Marvel'
      }
    },
    {
      variantId: 'marvel-series02',
      variantName: 'Marvel Series 02',
      name: 'Marvel Series Desk-Based Workstation Variant 02',
      description: 'Marvel Series workstation with alternate steel leg design.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series02.png',
      specifications: {
        'Leg Type': 'Steel (Variant 02)',
        'Surface': 'Engineered wood',
        'Series': 'Marvel'
      }
    }
  ],
  gallery: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series01.png',
      alt: 'Marvel Series Desk-Based Workstation',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series02.png',
      alt: 'Marvel Series Desk-Based Workstation Variant 02',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355102/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series03.png',
      alt: 'Marvel Series Desk-Based Workstation Variant 03',
    }
  ],
};

export default marvelWorkstation;
