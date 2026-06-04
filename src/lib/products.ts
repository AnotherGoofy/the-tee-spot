import teeWhite from "@/assets/tee-white.jpg";
import hoodieRed from "@/assets/hoodie-red.jpg";
import hoodieWhite from "@/assets/hoodie-white.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  tagline: string;
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    slug: "boxy-tee",
    name: "Heavyweight Boxy Tee",
    price: 28,
    compareAt: 42,
    image: teeWhite,
    tagline: "this tee hits different.",
    description:
      "Made from heavyweight 7.6 oz 100% combed cotton, this tee features a boxy, slightly cropped fit with longer sleeves. Pigment-dyed for a naturally worn-in look that gets softer with every wear.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "iconic-red-hoodie",
    name: "Iconic Red Hoodie",
    price: 58,
    compareAt: 72,
    image: hoodieRed,
    tagline: "the one everyone's wearing.",
    description:
      "Heavyweight fleece pullover with kangaroo pocket and ribbed cuffs. Oversized fit, built to outlast trends.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "streetwear-hoodie",
    name: "Streetwear Hoodie",
    price: 58,
    compareAt: 72,
    image: hoodieWhite,
    tagline: "soft. heavy. yours.",
    description:
      "Premium brushed-back fleece in a clean off-white. Drop-shoulder cut, double-lined hood, minimal chest detail.",
    sizes: ["S", "M", "L", "XL"],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
