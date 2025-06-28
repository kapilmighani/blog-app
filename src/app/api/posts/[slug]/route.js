import connectDB from "@/lib/mongoose";
import Post from "@/models/Post";

export async function GET(_, { params }) {
  await connectDB();
  const post = await Post.findOne({ slug: params.slug });
  return Response.json(post);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { title, content } = await req.json();
  const updated = await Post.findOneAndUpdate(
    { slug: params.slug },
    { title, content },
    { new: true }
  );
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Post.findOneAndDelete({ slug: params.slug });
  return Response.json({ success: true });
}
