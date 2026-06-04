export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} YIKES. All rights reserved.</p>
        <p className="font-semibold tracking-wide">made loud · worn proud</p>
      </div>
    </footer>
  );
}
