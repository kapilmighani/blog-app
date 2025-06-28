'use client';
export const dynamic = 'force-dynamic'; // 🛑 THIS IS CRITICAL TO AVOID SSR

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@mantine/rte';

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Post created successfully!");
      router.push('/');
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 15 }}
        />
        <RichTextEditor value={content} onChange={setContent} style={{ marginBottom: 15 }} />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
