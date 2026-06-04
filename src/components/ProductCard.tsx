import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.compareAt && (
          <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
            SALE
          </span>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-display text-xl text-foreground">{product.name}</h3>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          {product.compareAt && (
            <span className="text-muted-foreground line-through">
              £{product.compareAt.toFixed(2)}
            </span>
          )}
          <span className="font-semibold text-foreground">
            £{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
