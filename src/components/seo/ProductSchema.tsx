import React from 'react';

interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    sku?: string;
    brand?: string;
    gtin?: string;
    mpn?: string;
    inStock: boolean;
    rating?: number;
    reviewsCount?: number;
    url?: string;
  };
}

const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    ...(product.sku && { "sku": product.sku }),
    ...(product.mpn && { "mpn": product.mpn }),
    ...(product.gtin && { "gtin13": product.gtin }),
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Ilavam Panju"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      ...(product.url && { "url": product.url }),
      "seller": {
        "@type": "Organization",
        "name": "Ilavam Panju"
      }
    },
    ...(product.rating && product.reviewsCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewsCount,
        "bestRating": 5,
        "worstRating": 1
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ProductSchema;
