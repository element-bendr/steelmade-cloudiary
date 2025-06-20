import { ProductSeries } from "../../product-types";
import amazonExecutiveChair from './executive-series/amazon';
import amigoExecutiveChair from './executive-series/amigo';
import luxuryExecutiveChair from './executive-series/luxury';

export const executiveSeries: ProductSeries = {
  id: "executive-series",
  description: "Premium chairs designed for executives and high-end office environments.",
  products: {
    "commander-chair": {
      id: "commander-chair",
      name: "Commander Executive Chair",
      description: "The Commander Executive Chair is designed for those who lead with vision and authority. Its bold lines and ergonomic support inspire confidence in every decision.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800761/steelmade/chairs/executive-series/commander/ic-50-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800761/steelmade/chairs/executive-series/commander/ic-50-hb.jpg", alt: "Commander Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800765/steelmade/chairs/executive-series/commander/ic-49-mb.jpg", alt: "Commander Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Bold, sculpted backrest for commanding presence",
        "Premium upholstery for all-day comfort",
        "Ergonomic design with executive support",
        "Available in high-back and mid-back variants",
        "A chair for leaders who inspire and direct"
      ],
      specifications: {},
      variants: [
        {
          variantId: "commander-hb",
          variantName: "High Back",
          name: "Commander Executive Chair - High Back",
          description: "High back variant for maximum support and presence.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800761/steelmade/chairs/executive-series/commander/ic-50-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "commander-mb",
          variantName: "Mid Back",
          name: "Commander Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800765/steelmade/chairs/executive-series/commander/ic-49-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    "korean-chair": {
      id: "korean-chair",
      name: "Korean Executive Chair",
      description: "The Korean Executive Chair blends modern minimalism with ergonomic mastery, offering a tranquil yet powerful presence in any executive office.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799552/steelmade/chairs/executive-series/korean/ic-47-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799552/steelmade/chairs/executive-series/korean/ic-47-hb.jpg", alt: "Korean Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799549/steelmade/chairs/executive-series/korean/ic-48-mb.jpg", alt: "Korean Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Minimalist silhouette with subtle curves",
        "Breathable, premium upholstery",
        "Ergonomic lumbar support",
        "Available in high-back and mid-back variants",
        "A chair for calm, focused leadership"
      ],
      specifications: {},
      variants: [
        {
          variantId: "korean-hb",
          variantName: "High Back",
          name: "Korean Executive Chair - High Back",
          description: "High back variant for serene support and presence.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799552/steelmade/chairs/executive-series/korean/ic-47-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "korean-mb",
          variantName: "Mid Back",
          name: "Korean Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799549/steelmade/chairs/executive-series/korean/ic-48-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    amazon: {
      id: amazonExecutiveChair.id,
      name: amazonExecutiveChair.name,
      description: amazonExecutiveChair.description,
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: amazonExecutiveChair.imageUrl,
      images: amazonExecutiveChair.variants?.map((variant: any) => ({ url: variant.imageUrl, alt: `${amazonExecutiveChair.name} - ${variant.name}`, width: 800, height: 600 })) || [],
      features: amazonExecutiveChair.features,
      specifications: {},
      variants: amazonExecutiveChair.variants?.map(variant => ({
        variantId: variant.id,
        variantName: variant.name,
        name: `${amazonExecutiveChair.name} - ${variant.name}`,
        description: amazonExecutiveChair.description,
        imageUrl: variant.imageUrl,
        specifications: {}
      })) || [],
      price: '0'
    },
    amigo: {
      id: amigoExecutiveChair.id,
      name: amigoExecutiveChair.name,
      description: amigoExecutiveChair.description,
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: amigoExecutiveChair.imageUrl,
      images: amigoExecutiveChair.variants?.map((variant: any) => ({ url: variant.imageUrl, alt: `${amigoExecutiveChair.name} - ${variant.name}`, width: 800, height: 600 })) || [],
      features: amigoExecutiveChair.features,
      specifications: {},
      variants: amigoExecutiveChair.variants?.map(variant => ({
        variantId: variant.id,
        variantName: variant.name,
        name: `${amigoExecutiveChair.name} - ${variant.name}`,
        description: amigoExecutiveChair.description,
        imageUrl: variant.imageUrl,
        specifications: {}
      })) || [],
      price: '0'
    },
    luxury: {
      id: luxuryExecutiveChair.id,
      name: luxuryExecutiveChair.name,
      description: luxuryExecutiveChair.description,
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: luxuryExecutiveChair.imageUrl,
      images: luxuryExecutiveChair.variants?.map((variant: any) => ({ url: variant.imageUrl, alt: `${luxuryExecutiveChair.name} - ${variant.name}`, width: 800, height: 600 })) || [],
      features: luxuryExecutiveChair.features,
      specifications: {},
      variants: luxuryExecutiveChair.variants?.map(variant => ({
        variantId: variant.id,
        variantName: variant.name,
        name: `${luxuryExecutiveChair.name} - ${variant.name}`,
        description: luxuryExecutiveChair.description,
        imageUrl: variant.imageUrl,
        specifications: {}
      })) || [],
      price: '0'
    },
    lx: {
      id: "lx",
      name: "LX Executive Chair",
      description: "The LX Executive Chair embodies modern luxury and ergonomic excellence, offering both high-back and mid-back options for tailored executive comfort.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800988/steelmade/chairs/executive-series/lx/ic-51-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800988/steelmade/chairs/executive-series/lx/ic-51-hb.jpg", alt: "LX Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800983/steelmade/chairs/executive-series/lx/ic-52-mb.jpg", alt: "LX Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Sculpted, contemporary silhouette",
        "Premium upholstery with plush cushioning",
        "Ergonomic lumbar and neck support",
        "Available in high-back and mid-back variants",
        "A chair for those who value both style and substance"
      ],
      specifications: {},
      variants: [
        {
          variantId: "lx-hb",
          variantName: "High Back",
          name: "LX Executive Chair - High Back",
          description: "High back variant for maximum executive presence and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800988/steelmade/chairs/executive-series/lx/ic-51-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "lx-mb",
          variantName: "Mid Back",
          name: "LX Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and modern style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800983/steelmade/chairs/executive-series/lx/ic-52-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    obama: {
      id: "obama",
      name: "Obama Executive Chair",
      description: "The Obama Executive Chair delivers a blend of classic authority and modern ergonomic comfort, available in both high-back and mid-back options for versatile executive support.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639074/steelmade/chairs/executive-series/obama/ic-302-hb.png",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639074/steelmade/chairs/executive-series/obama/ic-302-hb.png", alt: "Obama Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639075/steelmade/chairs/executive-series/obama/ic-303-mb.png", alt: "Obama Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Classic executive silhouette with modern lines",
        "Premium upholstery and cushioning",
        "Ergonomic lumbar and neck support",
        "Available in high-back and mid-back variants",
        "A chair for leaders who value tradition and innovation"
      ],
      specifications: {},
      variants: [
        {
          variantId: "obama-hb",
          variantName: "High Back",
          name: "Obama Executive Chair - High Back",
          description: "High back variant for commanding presence and full support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639074/steelmade/chairs/executive-series/obama/ic-302-hb.png",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "obama-mb",
          variantName: "Mid Back",
          name: "Obama Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and classic style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639075/steelmade/chairs/executive-series/obama/ic-303-mb.png",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    benz: {
      id: "benz",
      name: "Benz Executive Chair",
      description: "The Benz Executive Chair offers a sleek, automotive-inspired design with plush comfort and a commanding presence for any executive office.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619914/steelmade/chairs/executive-series/benz/ic-34.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619914/steelmade/chairs/executive-series/benz/ic-34.jpg", alt: "Benz Executive Chair", width: 800, height: 600 }
      ],
      features: [
        "Automotive-inspired silhouette",
        "Premium upholstery and cushioning",
        "Ergonomic support for long hours",
        "A chair for those who value luxury and performance"
      ],
      specifications: {},
      variants: [
        {
          variantId: "benz-main",
          variantName: "Standard",
          name: "Benz Executive Chair",
          description: "Signature Benz design for executive comfort.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619914/steelmade/chairs/executive-series/benz/ic-34.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    duster: {
      id: "duster",
      name: "Duster Executive Chair",
      description: "The Duster Executive Chair features a bold, high-back design for maximum support and a modern executive look.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619677/steelmade/chairs/executive-series/duster/ic-36-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619677/steelmade/chairs/executive-series/duster/ic-36-hb.jpg", alt: "Duster Executive Chair - High Back", width: 800, height: 600 }
      ],
      features: [
        "High-back for full executive support",
        "Modern, bold styling",
        "Plush cushioning for all-day comfort",
        "A chair for leaders who stand tall"
      ],
      specifications: {},
      variants: [
        {
          variantId: "duster-hb",
          variantName: "High Back",
          name: "Duster Executive Chair - High Back",
          description: "High back variant for commanding presence and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619677/steelmade/chairs/executive-series/duster/ic-36-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    perkshynl: {
      id: "perkshynl",
      name: "Perkshynl Executive Chair",
      description: "The Perkshynl Executive Chair combines classic comfort with a contemporary edge, perfect for modern offices.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461921/steelmade/chairs/executive-series/perkshynl/ic-32.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461921/steelmade/chairs/executive-series/perkshynl/ic-32.jpg", alt: "Perkshynl Executive Chair", width: 800, height: 600 }
      ],
      features: [
        "Classic comfort with modern lines",
        "Supportive cushioning",
        "A chair for contemporary professionals"
      ],
      specifications: {},
      variants: [
        {
          variantId: "perkshynl-main",
          variantName: "Standard",
          name: "Perkshynl Executive Chair",
          description: "Signature Perkshynl comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461921/steelmade/chairs/executive-series/perkshynl/ic-32.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    perk: {
      id: "perk",
      name: "Perk Executive Chair",
      description: "The Perk Executive Chair is designed for simplicity, comfort, and everyday executive use.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461908/steelmade/chairs/executive-series/perk/ic-33.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461908/steelmade/chairs/executive-series/perk/ic-33.jpg", alt: "Perk Executive Chair", width: 800, height: 600 }
      ],
      features: [
        "Simple, ergonomic design",
        "Comfortable for daily use",
        "A chair for practical executives"
      ],
      specifications: {},
      variants: [
        {
          variantId: "perk-main",
          variantName: "Standard",
          name: "Perk Executive Chair",
          description: "Everyday comfort and executive simplicity.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461908/steelmade/chairs/executive-series/perk/ic-33.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    sahara: {
      id: "sahara",
      name: "Sahara Executive Chair",
      description: "The Sahara Executive Chair offers a blend of desert-inspired elegance and ergonomic comfort, available in high-back and mid-back variants.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg", alt: "Sahara Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799359/steelmade/chairs/executive-series/sahara/ic-45-mb.jpg", alt: "Sahara Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Desert-inspired design",
        "Premium upholstery",
        "Ergonomic support",
        "Available in high-back and mid-back variants"
      ],
      specifications: {},
      variants: [
        {
          variantId: "sahara-hb",
          variantName: "High Back",
          name: "Sahara Executive Chair - High Back",
          description: "High back variant for maximum support and presence.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "sahara-mb",
          variantName: "Mid Back",
          name: "Sahara Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749799359/steelmade/chairs/executive-series/sahara/ic-45-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    siemens: {
      id: "siemens",
      name: "Siemens Executive Chair",
      description: "The Siemens Executive Chair delivers German-inspired precision and comfort, with both high-back and mid-back options.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg", alt: "Siemens Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-42-mb.jpg", alt: "Siemens Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "German-inspired design",
        "Precision engineering",
        "Ergonomic comfort",
        "Available in high-back and mid-back variants"
      ],
      specifications: {},
      variants: [
        {
          variantId: "siemens-hb",
          variantName: "High Back",
          name: "Siemens Executive Chair - High Back",
          description: "High back variant for executive presence and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "siemens-mb",
          variantName: "Mid Back",
          name: "Siemens Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-42-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    syndicate: {
      id: "syndicate",
      name: "Syndicate Executive Chair",
      description: "The Syndicate Executive Chair is designed for boardrooms and high-level collaboration, with high-back and mid-back options.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg", alt: "Syndicate Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802131/steelmade/chairs/executive-series/syndicate/ic-60-mb.jpg", alt: "Syndicate Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Boardroom-ready design",
        "Collaborative comfort",
        "Ergonomic support",
        "Available in high-back and mid-back variants"
      ],
      specifications: {},
      variants: [
        {
          variantId: "syndicate-hb",
          variantName: "High Back",
          name: "Syndicate Executive Chair - High Back",
          description: "High back variant for boardroom presence and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "syndicate-mb",
          variantName: "Mid Back",
          name: "Syndicate Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and collaboration.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802131/steelmade/chairs/executive-series/syndicate/ic-60-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    verna: {
      id: "verna",
      name: "Verna Executive Chair",
      description: "The Verna Executive Chair brings Italian-inspired style and comfort to the executive office, with both high-back and mid-back options.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg", alt: "Verna Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797678/steelmade/chairs/executive-series/verna/ic-43-mb.jpg", alt: "Verna Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Italian-inspired design",
        "Premium comfort",
        "Ergonomic support",
        "Available in high-back and mid-back variants"
      ],
      specifications: {},
      variants: [
        {
          variantId: "verna-hb",
          variantName: "High Back",
          name: "Verna Executive Chair - High Back",
          description: "High back variant for executive presence and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "verna-mb",
          variantName: "Mid Back",
          name: "Verna Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749797678/steelmade/chairs/executive-series/verna/ic-43-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    },
    supreme: {
      id: "supreme",
      name: "Supreme Executive Chair",
      description: "The Supreme Executive Chair delivers top-tier comfort and authority, available in both high-back and mid-back variants for the ultimate executive experience.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg", alt: "Supreme Executive Chair - High Back", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/supreme/ic-56-mb.jpg", alt: "Supreme Executive Chair - Mid Back", width: 800, height: 600 }
      ],
      features: [
        "Top-tier executive design",
        "Plush, ergonomic cushioning",
        "Available in high-back and mid-back variants",
        "A chair for those who demand the best"
      ],
      specifications: {},
      variants: [
        {
          variantId: "supreme-hb",
          variantName: "High Back",
          name: "Supreme Executive Chair - High Back",
          description: "High back variant for maximum executive presence and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        },
        {
          variantId: "supreme-mb",
          variantName: "Mid Back",
          name: "Supreme Executive Chair - Mid Back",
          description: "Mid back variant for agile comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/supreme/ic-56-mb.jpg",
          specifications: {},
          imageClass: 'object-contain p-8 max-h-[420px]'
        }
      ],
      price: '0'
    }
  }
};