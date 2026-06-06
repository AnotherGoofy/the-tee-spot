import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — ORVANI" },
      { name: "description", content: "Read and write reviews for ORVANI." },
    ],
  }),
  component: ReviewsPage,
});

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: number;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  images: string[];
  comments?: Comment[];
  createdAt: number;
};

const STORAGE_KEY = "orvani-reviews";

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReviews(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (next: Review[]) => {
    setReviews(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 5)
      .map(
        (f) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(f);
          }),
      );
    const results = await Promise.all(readers);
    setImages((prev) => [...prev, ...results].slice(0, 5));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating < 1 || rating > 5) return;
    const review: Review = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rating,
      text: text.trim(),
      images,
      createdAt: Date.now(),
    };
    save([review, ...reviews]);
    setName("");
    setRating(0);
    setText("");
    setImages([]);
    setCreating(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl sm:text-5xl">Reviews</h1>
          <Button onClick={() => setCreating((v) => !v)}>
            {creating ? "Cancel" : "Create Review"}
          </Button>
        </div>

        {creating && (
          <form onSubmit={submit} className="mb-10 rounded-2xl border p-6 space-y-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="p-1"
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        n <= (hover || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Review</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">
                Photos (optional, up to 5)
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
              />
              {images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {images.map((src, i) => (
                    <div key={i} className="relative">
                      <img
                        src={src}
                        alt={`upload ${i + 1}`}
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => prev.filter((_, j) => j !== i))
                        }
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-foreground text-background text-xs leading-none"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" disabled={!name.trim() || rating < 1}>
              Submit Review
            </Button>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            There are no reviews yet
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-2xl border p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{r.name}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`h-4 w-4 ${
                          n <= r.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {r.text && <p className="mt-2 text-sm text-foreground/80">{r.text}</p>}
                {r.images && r.images.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.images.map((src, i) => (
                      <a key={i} href={src} target="_blank" rel="noreferrer">
                        <img
                          src={src}
                          alt={`review ${i + 1}`}
                          className="h-24 w-24 object-cover rounded-md border"
                        />
                      </a>
                    ))}
                  </div>
                )}
                <CommentSection
                  review={r}
                  onAdd={(comment) => {
                    const next = reviews.map((x) =>
                      x.id === r.id
                        ? { ...x, comments: [...(x.comments ?? []), comment] }
                        : x,
                    );
                    save(next);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
