import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import logo from "@/assets/orvani-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/" className="flex items-center">
          <img src={logo.url} alt="ORVANI" className="h-10 w-auto" width={160} height={40} />
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/reviews"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Reviews
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-foreground">
          <span className="text-sm font-semibold">GBP</span>
          <button aria-label="Search" className="hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="hover:text-primary transition-colors">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
