"use client";

import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";

import { urlFor } from "@/sanity/client";
import type { CatalogProduct } from "@/sanity/types";

import ProductIllustration from "./ProductIllustrations";

const PRODUCT_IMAGE_WIDTH = 900;
const PRODUCT_IMAGE_HEIGHT = 1125;

type ProductCardProps = {
  product: CatalogProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.image?.asset ? product.image : null;
  const imageUrl = image
    ? urlFor(image as SanityImageSource)
        .width(PRODUCT_IMAGE_WIDTH)
        .height(PRODUCT_IMAGE_HEIGHT)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const lqip = image?.asset?.metadata?.lqip;

  return (
    <article className="prod">
      <div className="prod-fig">
        {product.badge ? (
          <span className={`prod-badge${product.badge === "Premium" ? " gold" : ""}`}>
            {product.badge}
          </span>
        ) : null}
        <button className="prod-fav" aria-label={`Favori ${product.name}`}>
          ♡
        </button>
        {imageUrl ? (
          <Image
            className="prod-img"
            src={imageUrl}
            alt={image?.alt || product.name}
            width={PRODUCT_IMAGE_WIDTH}
            height={PRODUCT_IMAGE_HEIGHT}
            sizes="(min-width: 1280px) 22vw, (min-width: 700px) 40vw, 90vw"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            unoptimized
          />
        ) : (
          <ProductIllustration type={product.illustration} />
        )}
      </div>
      <div className="prod-info">
        <div className="prod-row">
          <div className="prod-name">{product.name}</div>
          {product.price ? <div className="prod-price">{product.price}</div> : null}
        </div>
        {product.sub ? <div className="prod-sub">{product.sub}</div> : null}
        <a href="#cta" className="prod-cta">
          Voir le produit <span className="arr">→</span>
        </a>
      </div>
    </article>
  );
}
