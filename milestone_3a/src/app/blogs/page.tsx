import React from "react";
import blogs from "../blogData";
import BlogPreview from "@/components/blogPreview";
import connectDB from "../../helper/db";
import Blogs from "../../database/blogSchema";

async function getBlogs() {
    await connectDB(); // function from db.ts before

    try {
        // query for all blogs and sort by date
        const blogs = await Blogs.find().sort({ date: -1 }).orFail();
        // send a response as the blogs as the message
        return blogs;
    } catch (err) {
        return null;
    }
}

export default function Blog() {
    return getBlogs().then((blogs)=> {
        return (
            <main>
                <h1 className="blog">Blog</h1>
                <div className="blog-container">
                    {blogs?.map((blog) => (
                        <BlogPreview 
                            key={blog.slug}
                            title={blog.title}
                            description={blog.description}
                            slug={blog.slug}
                            image={blog.image}
                            date={blog.date}
                        />
                    ))}
                </div>
            </main>
        );
    });
}