"use client";

import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import { useState } from "react";

import { urlFor } from "@/sanity/client";
import type { CatalogImage, CatalogProduct } from "@/sanity/types";

import ProductIllustration from "./ProductIllustrations";

const PRODUCT_IMAGE_WIDTH = 900;
const PRODUCT_IMAGE_HEIGHT = 1125;

type ProductCardProps = {
  product: CatalogProduct;
};

function buildImageUrl(image: CatalogImage) {
  return urlFor(image as SanityImageSource)
    .width(PRODUCT_IMAGE_WIDTH)
    .height(PRODUCT_IMAGE_HEIGHT)
    .fit("crop")
    .auto("format")
    .url();
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = (product.images ?? []).filter((img) => img?.asset);
  const [active, setActive] = useState(0);
  const current = images[active] ?? null;
  const lqip = current?.asset?.metadata?.lqip;

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
        {current ? (
          <Image
            className="prod-img"
            src={buildImageUrl(current)}
            alt={current.alt || product.name}
            width={PRODUCT_IMAGE_WIDTH}
            height={PRODUCT_IMAGE_HEIGHT}
            sizes="(min-width: 1280px) 22vw, (min-width: 700px) 40vw, 90vw"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            key={active}
          />
        ) : (
          <ProductIllustration type={product.illustration} />
        )}
        {images.length > 1 ? (
          <div className="prod-dots" role="tablist" aria-label="Images du produit">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Image ${i + 1} sur ${images.length}`}
                className={`prod-dot${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="prod-info">
        <div className="prod-row">
          <div className="prod-name">{product.name}</div>
          {product.price ? <div className="prod-price">{product.price}</div> : null}
        </div>
        {product.sub ? <div className="prod-sub">{product.sub}</div> : null}
        <a href="#cta" className="prod-cta">
          Demander un devis <span className="arr">→</span>
        </a>
      </div>
    </article>
  );
}
