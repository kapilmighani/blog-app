'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactQuill from '@/components/ReactQuillWrapper';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content required");
      return;
    }
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      alert("Post Created!");
      router.push('/');
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ height: "300px", marginBottom: "10px" }}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
