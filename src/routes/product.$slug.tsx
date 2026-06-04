import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — YIKES` },
            { name: "description", content: p.tagline },
            { property: "og:title", content: p.name },
            { property: "og:description", content: p.tagline },
            { property: "og:image", content: p.image },
          ]
        : [{ title: "Product — YIKES" }],
    };
  },
  component: ProductPage,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<string | null>(null);
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10">
        <Link
          to="/"
          className="text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          ← Back to shop
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="rounded-3xl overflow-hidden bg-secondary aspect-square">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-display text-3xl sm:text-5xl leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              {product.compareAt && (
                <span className="text-lg text-muted-foreground line-through">
                  £{product.compareAt.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold">£{product.price.toFixed(2)}</span>
            </div>

            <p className="mt-6 font-semibold text-foreground">{product.tagline}</p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              Please note all sizes listed are{" "}
              <span className="font-bold text-foreground">ADULT SIZES</span>.
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold mb-3">Select size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 w-14 rounded-xl border-2 font-bold transition-all ${
                      size === s
                        ? "border-primary bg-primary text-primary-foreground scale-105"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                alert(
                  size
                    ? `Added ${product.name} (${size}) to cart!`
                    : "Pick a size first!",
                )
              }
              className="mt-8 w-full rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg hover:scale-[1.02] transition-transform"
            >
              Add to Cart
            </button>

            <div className="mt-8 rounded-2xl bg-secondary/60 p-5 text-sm text-muted-foreground space-y-3">
              <p>
                <span className="font-bold text-foreground">Color bleeding warning:</span>{" "}
                pigment-dyed garments may bleed in the first wash. Wash separately in cold
                water.
              </p>
              <p>
                <span className="font-bold text-foreground">International customers:</span>{" "}
                customs fees on arrival are the buyer's responsibility.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="font-display text-3xl mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center p-10 text-center">
        <div>
          <h1 className="font-display text-5xl">Not in this drop</h1>
          <p className="mt-3 text-muted-foreground">That product doesn't exist.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="min-h-screen flex items-center justify-center p-10 text-center">
      <div>
        <h1 className="font-display text-3xl">Something went sideways</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
