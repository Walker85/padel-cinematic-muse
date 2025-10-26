import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2024-10';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'padel-cinematic-muse-utsrg.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '6b6188db7e4028a9ff3021e557f614b6';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
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
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export async function getProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first });
  return data?.data?.products?.edges || [];
}

export async function getProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle;
}

// Event metaobject interface
export interface ShopifyEvent {
  id: string;
  handle: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  type: 'Tournament' | 'Training' | 'Social';
  status: 'upcoming' | 'past';
  registerUrl?: string;
  featured: boolean;
}

const EVENTS_QUERY = `
  query GetEvents($first: Int!) {
    metaobjects(type: "event", first: $first) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const EVENT_BY_HANDLE_QUERY = `
  query GetEventByHandle($handle: String!) {
    metaobject(handle: { type: "event", handle: $handle }) {
      id
      handle
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
`;

// Helper to parse metaobject fields into event object
function parseEventMetaobject(node: any): ShopifyEvent {
  const fields = node.fields.reduce((acc: any, field: any) => {
    if (field.key === 'image' && field.reference?.image?.url) {
      acc[field.key] = field.reference.image.url;
    } else {
      acc[field.key] = field.value;
    }
    return acc;
  }, {});

  return {
    id: node.id,
    handle: node.handle,
    title: fields.title || '',
    date: fields.date || '',
    location: fields.location || '',
    description: fields.description || '',
    image: fields.image || '/images/soho-house-hero-new.png',
    type: fields.type || 'Social',
    status: fields.status || 'upcoming',
    registerUrl: fields.register_url,
    featured: fields.featured === 'true' || fields.featured === true,
  };
}

export async function getEvents(first: number = 50): Promise<ShopifyEvent[]> {
  try {
    const data = await storefrontApiRequest(EVENTS_QUERY, { first });
    const edges = data?.data?.metaobjects?.edges || [];
    return edges.map((edge: any) => parseEventMetaobject(edge.node));
  } catch (error) {
    console.error('Error fetching events from Shopify:', error);
    return [];
  }
}

export async function getEventByHandle(handle: string): Promise<ShopifyEvent | null> {
  try {
    const data = await storefrontApiRequest(EVENT_BY_HANDLE_QUERY, { handle });
    const metaobject = data?.data?.metaobject;
    if (!metaobject) return null;
    return parseEventMetaobject(metaobject);
  } catch (error) {
    console.error('Error fetching event by handle:', error);
    return null;
  }
}
