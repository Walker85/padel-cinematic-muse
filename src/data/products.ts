import racketImage from "@/assets/pr-racket-black.png";

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  images: Array<{
    url: string;
    altText: string | null;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  options: Array<{
    name: string;
    values: string[];
  }>;
}

export const products: Product[] = [
  {
    id: "1",
    title: "RDY Pro Carbon",
    handle: "rdy-pro-carbon",
    description: "Premium carbon fiber racket designed for advanced players seeking maximum control and power. Features diamond shape for aggressive play and EVA soft core for superior comfort.",
    price: {
      amount: "299.00",
      currencyCode: "GBP",
    },
    images: [
      { url: racketImage, altText: "RDY Pro Carbon - Front View" },
      { url: racketImage, altText: "RDY Pro Carbon - Detail" },
      { url: racketImage, altText: "RDY Pro Carbon - Side View" },
      { url: racketImage, altText: "RDY Pro Carbon - Lifestyle" },
    ],
    variants: [
      {
        id: "v1-1",
        title: "Low Balance / Soft Grip",
        price: { amount: "299.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "Low" },
          { name: "Grip", value: "Soft" },
        ],
      },
      {
        id: "v1-2",
        title: "Medium Balance / Medium Grip",
        price: { amount: "299.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "Medium" },
          { name: "Grip", value: "Medium" },
        ],
      },
      {
        id: "v1-3",
        title: "High Balance / Hard Grip",
        price: { amount: "299.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "High" },
          { name: "Grip", value: "Hard" },
        ],
      },
    ],
    options: [
      { name: "Balance", values: ["Low", "Medium", "High"] },
      { name: "Grip", values: ["Soft", "Medium", "Hard"] },
    ],
  },
  {
    id: "2",
    title: "RDY Elite Power",
    handle: "rdy-elite-power",
    description: "High-performance power racket with optimized weight distribution for explosive shots. Carbon fiber construction with reinforced frame for durability.",
    price: {
      amount: "349.00",
      currencyCode: "GBP",
    },
    images: [
      { url: racketImage, altText: "RDY Elite Power - Front View" },
      { url: racketImage, altText: "RDY Elite Power - Detail" },
    ],
    variants: [
      {
        id: "v2-1",
        title: "Medium Balance / Medium Grip",
        price: { amount: "349.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "Medium" },
          { name: "Grip", value: "Medium" },
        ],
      },
      {
        id: "v2-2",
        title: "High Balance / Hard Grip",
        price: { amount: "349.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "High" },
          { name: "Grip", value: "Hard" },
        ],
      },
    ],
    options: [
      { name: "Balance", values: ["Medium", "High"] },
      { name: "Grip", values: ["Medium", "Hard"] },
    ],
  },
  {
    id: "3",
    title: "RDY Control Master",
    handle: "rdy-control-master",
    description: "Precision-focused racket for players who prioritize control and placement. Balanced weight distribution and responsive core for tactical play.",
    price: {
      amount: "279.00",
      currencyCode: "GBP",
    },
    images: [
      { url: racketImage, altText: "RDY Control Master - Front View" },
      { url: racketImage, altText: "RDY Control Master - Detail" },
    ],
    variants: [
      {
        id: "v3-1",
        title: "Low Balance / Soft Grip",
        price: { amount: "279.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "Low" },
          { name: "Grip", value: "Soft" },
        ],
      },
      {
        id: "v3-2",
        title: "Medium Balance / Medium Grip",
        price: { amount: "279.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "Medium" },
          { name: "Grip", value: "Medium" },
        ],
      },
    ],
    options: [
      { name: "Balance", values: ["Low", "Medium"] },
      { name: "Grip", values: ["Soft", "Medium"] },
    ],
  },
  {
    id: "4",
    title: "RDY Starter Edition",
    handle: "rdy-starter-edition",
    description: "Perfect entry-level racket for beginners. Balanced design with forgiving sweet spot and comfortable grip. Quality construction at an accessible price.",
    price: {
      amount: "199.00",
      currencyCode: "GBP",
    },
    images: [
      { url: racketImage, altText: "RDY Starter Edition - Front View" },
      { url: racketImage, altText: "RDY Starter Edition - Detail" },
    ],
    variants: [
      {
        id: "v4-1",
        title: "Medium Balance / Soft Grip",
        price: { amount: "199.00", currencyCode: "GBP" },
        availableForSale: true,
        selectedOptions: [
          { name: "Balance", value: "Medium" },
          { name: "Grip", value: "Soft" },
        ],
      },
    ],
    options: [
      { name: "Balance", values: ["Medium"] },
      { name: "Grip", values: ["Soft"] },
    ],
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}

export function getAllProducts(): Product[] {
  return products;
}
