import connectDB from "@/lib/mongoose";
import Post from "@/models/Post";
import slugify from "slugify";

export async function POST(req) {
  await connectDB();
  const { title, content } = await req.json();
  const slug = slugify(title, { lower: true });
  const post = await Post.create({ title, content, slug });
  return Response.json(post);
}

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return Response.json(posts);
}
