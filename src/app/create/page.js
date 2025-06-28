'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "@/components/ReactQuillWrapper";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} />
      <button type="submit">Create</button>
    </form>
  );
}
