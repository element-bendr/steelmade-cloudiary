import type { ExtendedProductData, ProductImage, ProductSeries } from "../../product-types";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dqde19mfs/image/upload";
const METAL_STORAGE_FOLDER = "steelmade/metal%20storage";

const createMetalStorageImage = (filename: string, alt: string): ProductImage => ({
  url: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/${filename}`,
  alt,
  width: 1200,
  height: 900
});

const twoDrawerPedestal: ExtendedProductData = {
  id: "two-drawerpedestal",
  name: "Two Drawer Pedestal",
  description: "A compact sentinel of order, shaped from powder-kissed steel with drawers that whisper shut.",
  category: "storage-solutions",
  seriesId: "metal-storages",
  inStock: true,
  imageUrl: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/two-drawerpedestal.png`,
  images: [
    createMetalStorageImage("two-drawerpedestal.png", "Two Drawer Pedestal in graphite finish"),
    createMetalStorageImage("two-drawerpedestal-open.png", "Two Drawer Pedestal with drawers open"),
    createMetalStorageImage("two-drawerpedestal-detail.png", "Detail of locking mechanism on the Two Drawer Pedestal")
  ],
  features: [
    "Lockable drawers that keep confidences quiet",
    "Ball-bearing runners for a hush-soft glide",
    "Powder-coated shell that resists the restless day"
  ],
  specifications: {
    Material: "18-gauge powder-coated steel",
    Dimensions: "405mm W × 500mm D × 650mm H",
    Security: "Central locking with twin keys",
    Mobility: "Optional casters with soft tread"
  },
  variants: [
    {
      variantId: "two-drawerpedestal-graphite",
      variantName: "Graphite Shell",
      name: "Two Drawer Pedestal · Graphite",
      description: "Graphite powder coat with velvet-smooth slides and a felt-lined top drawer.",
      imageUrl: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/two-drawerpedestal.png`,
      specifications: {
        Finish: "Graphite powder coat",
        Configuration: "One box drawer, one file drawer",
        Locking: "Central lock with spare key"
      }
    }
  ]
};

const threeDrawerPedestal: ExtendedProductData = {
  id: "three-drawerpedestal",
  name: "Three Drawer Pedestal",
  description: "A trio of quiet chambers, choreographed for paper, plans, and the pulse of daily craft.",
  category: "storage-solutions",
  seriesId: "metal-storages",
  inStock: true,
  imageUrl: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/three-drawerpedestal.png`,
  images: [
    createMetalStorageImage("three-drawerpedestal.png", "Three Drawer Pedestal in deep graphite"),
    createMetalStorageImage("three-drawerpedestal02.png", "Three Drawer Pedestal showcasing alternate finish")
  ],
  features: [
    "Three synchronized drawers that orchestrate documents, devices, and dreams",
    "Precision runners tuned for feather-light pull",
    "Powder-coated armor that resists restless corridors"
  ],
  specifications: {
    Material: "18-gauge powder-coated steel",
    Dimensions: "405mm W × 500mm D × 1020mm H",
    Security: "Central locking with master key set",
    Organization: "Two box drawers, one full-depth file drawer"
  },
  variants: [
    {
      variantId: "three-drawerpedestal-graphite",
      variantName: "Graphite Resonance",
      name: "Three Drawer Pedestal · Graphite Resonance",
      description: "Graphite resonance finish with brushed steel pulls that catch the morning light.",
      imageUrl: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/three-drawerpedestal.png`,
      specifications: {
        Finish: "Graphite powder coat",
        Configuration: "Two box drawers + one file drawer",
        Pulls: "Brushed steel, soft edge"
      }
    },
    {
      variantId: "three-drawerpedestal-porcelain",
      variantName: "Porcelain Drift",
      name: "Three Drawer Pedestal · Porcelain Drift",
      description: "Porcelain drift palette with matte nickel hardware for serene studios.",
      imageUrl: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/three-drawerpedestal02.png`,
      specifications: {
        Finish: "Porcelain white powder coat",
        Configuration: "Two box drawers + one file drawer",
        Pulls: "Matte nickel, low-profile"
      }
    }
  ]
};

export const metalStorages: ProductSeries = {
  id: "metal-storages",
  title: "Metal Storages",
  description: "Steel sanctuaries for documents and devices, tuned for modern momentum.",
  seoDescription: "Discover SteelMade metal storage pedestals crafted for quiet strength, smooth access, and enduring order.",
  category: "storage-solutions",
  imageUrl: `${CLOUDINARY_BASE_URL}/${METAL_STORAGE_FOLDER}/three-drawerpedestal.png`,
  coverImage: createMetalStorageImage("three-drawerpedestal.png", "Three Drawer Pedestal poised for service"),
  images: [
    createMetalStorageImage("two-drawerpedestal-open.png", "Two Drawer Pedestal revealing its interior"),
    createMetalStorageImage("two-drawerpedestal-detail.png", "Close-up of powder-coated steel seams"),
    createMetalStorageImage("three-drawerpedestal02.png", "Three Drawer Pedestal in porcelain drift finish")
  ],
  features: [
    "Monocoque steel bodies welded for whisper-still rigidity",
    "Compact footprints that honour agile work zones",
    "Frictionless hardware tuned for daily cadence",
    "Scalable drawer compositions for evolving archives"
  ],
  lastModified: new Date("2025-09-26T00:00:00.000Z").toISOString(),
  products: {
    [twoDrawerPedestal.id]: twoDrawerPedestal,
    [threeDrawerPedestal.id]: threeDrawerPedestal
  }
};

export default metalStorages;
