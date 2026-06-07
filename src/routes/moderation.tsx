import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/moderation")({
  head: () => ({
    meta: [
      { title: "Moderation — ORVANI" },
      { name: "description", content: "Moderate review comments." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ModerationPage,
});

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: number;
  hidden?: boolean;
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
const AUTH_KEY = "orvani-mod-auth";
const MOD_PASSCODE = "orvani-admin";

function ModerationPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
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

  const updateComment = (
    reviewId: string,
    commentId: string,
    updater: (c: Comment) => Comment | null,
  ) => {
    const next = reviews.map((r) => {
      if (r.id !== reviewId) return r;
      const updated = (r.comments ?? [])
        .map((c) => (c.id === commentId ? updater(c) : c))
        .filter((c): c is Comment => c !== null);
      return { ...r, comments: updated };
    });
    save(next);
  };

  const tryAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === MOD_PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } else {
      alert("Incorrect passcode");
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPass("");
  };

  const allComments = reviews.flatMap((r) =>
    (r.comments ?? []).map((c) => ({ review: r, comment: c })),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl sm:text-5xl">Moderation</h1>
          {authed && (
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          )}
        </div>

        {!authed ? (
          <form onSubmit={tryAuth} className="rounded-2xl border p-6 space-y-4 max-w-sm">
            <label className="text-sm font-semibold block">Admin passcode</label>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter passcode"
              autoFocus
            />
            <Button type="submit" disabled={!pass}>
              Unlock
            </Button>
            <p className="text-xs text-muted-foreground">
              Default passcode: <code>orvani-admin</code>
            </p>
          </form>
        ) : allComments.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No comments to moderate.</p>
        ) : (
          <ul className="space-y-3">
            {allComments.map(({ review, comment }) => (
              <li
                key={comment.id}
                className={`rounded-2xl border p-4 ${
                  comment.hidden ? "opacity-60 bg-muted/30" : ""
                }`}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  On review by {review.name}
                  {comment.hidden && (
                    <span className="ml-2 text-amber-600 font-medium">Hidden</span>
                  )}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{comment.name}: </span>
                  <span className="text-foreground/80">{comment.text}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateComment(review.id, comment.id, (c) => ({
                        ...c,
                        hidden: !c.hidden,
                      }))
                    }
                  >
                    {comment.hidden ? "Unhide" : "Hide"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Delete this comment permanently?")) {
                        updateComment(review.id, comment.id, () => null);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
