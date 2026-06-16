"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function FeedbackForm({ articleSlug }: { articleSlug: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [honey, setHoney] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honey) return;
    if (!message.trim()) return;

    setStatus("sending");

    const { error } = await supabase.from("feedback").insert({
      article_slug: articleSlug,
      name: name.trim() || null,
      message: message.trim(),
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
      setName("");
      setMessage("");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-border mt-12 pt-8">
        <p className="text-muted">
          Thanks. Your response has been recorded and will reach Nick.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border mt-12 pt-8">
      <h3 className="text-lg font-semibold mb-1">Respond</h3>
      <p className="text-sm text-muted mb-6">
        Criticism, disagreement, and holes in the argument are the most useful
        responses. This reaches Nick directly.
      </p>

      <input
        type="text"
        name="website"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm text-muted mb-1">
          Name (optional)
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="w-full bg-transparent border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-muted"
          placeholder="Anonymous if left blank"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm text-muted mb-1">
          Response
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={5000}
          rows={4}
          required
          className="w-full bg-transparent border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-muted resize-y"
          placeholder="What's wrong with this argument? What did I miss?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || !message.trim()}
        className="text-sm border border-border rounded px-4 py-2 hover:bg-accent/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 mt-2">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
