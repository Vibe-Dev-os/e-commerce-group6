export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  colors: {
    name: string
    value: string
  }[]
  sizes: string[]
  category: string
}

export const products: Product[] = [
  {
    id: "predator-helios-gaming-laptop",
    name: "Predator Helios Gaming Laptop",
    price: 1899.0,
    description:
      "Intel Core i9-13900HX, NVIDIA RTX 4070, 32GB DDR5 RAM, 1TB NVMe SSD. 165Hz QHD display for ultimate gaming performance.",
    images: [
      "/black-gaming-laptop-with-rgb-keyboard.jpg",
      "/black-gaming-laptop-side-view.jpg",
      "/black-gaming-laptop-open-display.jpg",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Silver", value: "silver" },
    ],
    sizes: ["RTX 4060", "RTX 4070", "RTX 4090"],
    category: "laptops",
  },
  {
    id: "rog-strix-gaming-laptop",
    name: "ROG Strix Gaming Laptop",
    price: 2299.0,
    description: "AMD Ryzen 9 7945HX, NVIDIA RTX 4080, 32GB DDR5 RAM, 2TB NVMe SSD. 240Hz FHD display with G-SYNC.",
    images: ["/black-red-gaming-laptop-with-backlit-keyboard.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: ["RTX 4070", "RTX 4080", "RTX 4090"],
    category: "laptops",
  },
  {
    id: "legion-pro-gaming-laptop",
    name: "Legion Pro Gaming Laptop",
    price: 1599.0,
    description: "Intel Core i7-13700HX, NVIDIA RTX 4060, 16GB DDR5 RAM, 512GB NVMe SSD. 144Hz FHD display.",
    images: ["/gray-gaming-laptop-with-white-backlit-keyboard.jpg"],
    colors: [
      { name: "Gray", value: "gray" },
      { name: "Black", value: "black" },
    ],
    sizes: ["RTX 4050", "RTX 4060", "RTX 4070"],
    category: "laptops",
  },
  {
    id: "razer-deathadder-gaming-mouse",
    name: "Razer DeathAdder V3 Pro",
    price: 149.0,
    description:
      "Wireless gaming mouse with Focus Pro 30K optical sensor, 90-hour battery life, and customizable RGB lighting.",
    images: ["/black-wireless-gaming-mouse-with-rgb.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: ["Wireless", "Wired"],
    category: "mice",
  },
  {
    id: "logitech-g502-gaming-mouse",
    name: "Logitech G502 X Plus",
    price: 159.0,
    description: "Wireless gaming mouse with HERO 25K sensor, 11 programmable buttons, and LIGHTSYNC RGB.",
    images: ["/black-gaming-mouse-with-side-buttons.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: ["Wireless", "Wired"],
    category: "mice",
  },
  {
    id: "steelseries-aerox-gaming-mouse",
    name: "SteelSeries Aerox 9",
    price: 129.0,
    description: "Ultra-lightweight wireless gaming mouse with 18,000 CPI TrueMove Air sensor and 12 side buttons.",
    images: ["/white-lightweight-gaming-mouse.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: ["Wireless", "Wired"],
    category: "mice",
  },
  {
    id: "secretlab-titan-gaming-chair",
    name: "Secretlab Titan Evo 2024",
    price: 549.0,
    description:
      "Premium gaming chair with NEO Hybrid Leatherette, 4D armrests, and full metal frame. Supports up to 290 lbs.",
    images: ["/black-leather-gaming-chair-with-lumbar-support.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Blue", value: "blue" },
      { name: "Red", value: "red" },
    ],
    sizes: ["Small", "Regular", "XL"],
    category: "chairs",
  },
  {
    id: "dxracer-master-gaming-chair",
    name: "DXRacer Master Series",
    price: 499.0,
    description: "Ergonomic gaming chair with premium PU leather, adjustable lumbar support, and 4D armrests.",
    images: ["/black-red-racing-style-gaming-chair.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Red", value: "red" },
      { name: "White", value: "white" },
    ],
    sizes: ["Standard", "Wide", "XL"],
    category: "chairs",
  },
  {
    id: "msi-raider-gaming-laptop",
    name: "MSI Raider GE78 HX",
    price: 2599.0,
    description: "Intel Core i9-13980HX, NVIDIA RTX 4090, 64GB DDR5 RAM, 4TB NVMe SSD. 240Hz QHD+ display with Mini LED.",
    images: ["/black-gaming-laptop-with-rgb-keyboard.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Titanium", value: "gray" },
    ],
    sizes: ["RTX 4080", "RTX 4090"],
    category: "laptops",
  },
  {
    id: "alienware-x17-gaming-laptop",
    name: "Alienware x17 R2",
    price: 2199.0,
    description: "Intel Core i9-12900HK, NVIDIA RTX 4080, 32GB DDR5 RAM, 2TB NVMe SSD. 360Hz FHD display.",
    images: ["/black-gaming-laptop-open-display.jpg"],
    colors: [
      { name: "Lunar Light", value: "white" },
      { name: "Dark Side", value: "black" },
    ],
    sizes: ["RTX 4070", "RTX 4080"],
    category: "laptops",
  },
  {
    id: "gigabyte-aorus-gaming-laptop",
    name: "Gigabyte AORUS 17X",
    price: 1999.0,
    description: "Intel Core i9-13900HX, NVIDIA RTX 4070, 32GB DDR5 RAM, 1TB NVMe SSD. 300Hz QHD display.",
    images: ["/black-gaming-laptop-side-view.jpg"],
    colors: [
      { name: "Black", value: "black" },
    ],
    sizes: ["RTX 4060", "RTX 4070", "RTX 4080"],
    category: "laptops",
  },
  {
    id: "corsair-darkcore-gaming-mouse",
    name: "Corsair Dark Core RGB Pro",
    price: 89.0,
    description: "Wireless gaming mouse with 18,000 DPI sensor, Qi wireless charging, and customizable RGB.",
    images: ["/black-wireless-gaming-mouse-with-rgb.jpg"],
    colors: [
      { name: "Black", value: "black" },
    ],
    sizes: ["Wireless", "Wired"],
    category: "mice",
  },
  {
    id: "glorious-model-o-gaming-mouse",
    name: "Glorious Model O Wireless",
    price: 79.0,
    description: "Ultra-lightweight wireless gaming mouse, 19,000 DPI BAMF sensor, 71-hour battery life.",
    images: ["/white-lightweight-gaming-mouse.jpg"],
    colors: [
      { name: "Matte Black", value: "black" },
      { name: "Matte White", value: "white" },
      { name: "Glossy Black", value: "black" },
    ],
    sizes: ["Wireless", "Wired"],
    category: "mice",
  },
  {
    id: "finalmouse-ultralight-gaming-mouse",
    name: "Finalmouse UltralightX",
    price: 189.0,
    description: "Premium ultra-lightweight gaming mouse with magnesium alloy shell and PixArt 3370 sensor.",
    images: ["/black-gaming-mouse-with-side-buttons.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: ["Small", "Medium"],
    category: "mice",
  },
  {
    id: "noblechairs-hero-gaming-chair",
    name: "noblechairs HERO",
    price: 449.0,
    description: "Premium gaming chair with real leather upholstery, cold-foam padding, and aluminum base.",
    images: ["/black-leather-gaming-chair-with-lumbar-support.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
      { name: "Brown", value: "brown" },
    ],
    sizes: ["Standard", "XL"],
    category: "chairs",
  },
  {
    id: "corsair-tc100-gaming-chair",
    name: "Corsair TC100 Relaxed",
    price: 299.0,
    description: "Comfortable gaming chair with breathable fabric, adjustable armrests, and ergonomic design.",
    images: ["/black-red-racing-style-gaming-chair.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Gray", value: "gray" },
    ],
    sizes: ["Standard"],
    category: "chairs",
  },
  {
    id: "andaseaT-kaiser-gaming-chair",
    name: "AndaSeat Kaiser 3",
    price: 479.0,
    description: "Premium gaming chair with magnetic memory foam head pillow, 4D armrests, and PVC leather.",
    images: ["/black-leather-gaming-chair-with-lumbar-support.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Blue", value: "blue" },
      { name: "Pink", value: "pink" },
    ],
    sizes: ["Standard", "XL", "XXL"],
    category: "chairs",
  },
  {
    id: "herman-miller-vantum-gaming-chair",
    name: "Herman Miller X Logitech Vantum",
    price: 995.0,
    description: "Ergonomic gaming chair designed with Logitech G, featuring PostureFit sacral support and breathable suspension.",
    images: ["/black-red-racing-style-gaming-chair.jpg"],
    colors: [
      { name: "Black", value: "black" },
    ],
    sizes: ["Universal"],
    category: "chairs",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(productId: string, limit = 5): Product[] {
  return products.filter((p) => p.id !== productId).slice(0, limit)
}
