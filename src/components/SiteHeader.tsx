import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  return (
    <>
      <div className="w-full bg-primary text-primary-foreground text-center text-xs sm:text-sm font-semibold tracking-wide py-2.5 px-4">
        WE SHIP INTERNATIONALLY NOW!
      </div>
      <header className="w-full">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="YIKES" className="h-12 w-auto" width={160} height={48} />
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Home
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
    </>
  );
}
