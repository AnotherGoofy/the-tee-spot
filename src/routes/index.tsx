import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import logo from "@/assets/orvani-logo.png.asset.json";
import hoodieRed from "@/assets/hoodie-red.jpg";
import teeWhite from "@/assets/tee-white.jpg";
import hoodieWhite from "@/assets/hoodie-white.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORVANI — Loud streetwear, worn proud" },
      {
        name: "description",
        content:
          "Heavyweight tees and hoodies. New drop now available.",
      },
      { property: "og:title", content: "ORVANI — Loud streetwear" },
      {
        property: "og:description",
        content: "Heavyweight tees and hoodies.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 sm:pt-16 sm:pb-28">
            <div className="grid grid-cols-3 items-center gap-4 sm:gap-8">
              <img
                src={hoodieWhite}
                alt=""
                width={500}
                height={500}
                className="hidden sm:block rounded-2xl rotate-[-8deg] shadow-xl"
              />
              <div className="col-span-3 sm:col-span-1 text-center">
                <img
                  src={logo.url}
                  alt="ORVANI"
                  width={600}
                  height={300}
                  className="mx-auto w-full max-w-sm"
                />
                <p className="mt-6 font-display text-2xl sm:text-3xl text-foreground leading-tight">
                  loud streetwear,<br />worn proud.
                </p>
                <a
                  href="#shop"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-lg hover:scale-105 transition-transform"
                >
                  Shop the drop
                </a>
              </div>
              <img
                src={hoodieRed}
                alt=""
                width={500}
                height={500}
                className="hidden sm:block rounded-2xl rotate-[6deg] shadow-xl"
              />
            </div>
          </div>
        </section>


        {/* Shop grid */}
        <section id="shop" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl sm:text-5xl">The collection</h2>
            <p className="mt-2 text-muted-foreground">Limited runs. Built to last.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* Lookbook strip */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-3xl bg-foreground text-background overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 sm:p-14 flex flex-col justify-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-pop-yellow">
                Worn by you
              </span>
              <h3 className="mt-3 font-display text-4xl sm:text-5xl leading-none">
                Tag us<br />#orvanifit
              </h3>
              <p className="mt-4 text-background/70 max-w-md">
                Send us your fit. The best ones get featured on the site and a free
                drop from the next collection.
              </p>
            </div>
            <div className="relative aspect-square md:aspect-auto">
              <img
                src={teeWhite}
                alt="Lookbook"
                width={1024}
                height={1024}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
