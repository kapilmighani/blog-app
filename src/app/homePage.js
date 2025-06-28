'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
}
