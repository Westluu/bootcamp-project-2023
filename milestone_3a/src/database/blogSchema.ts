import mongoose, { Schema } from "mongoose";

// typescript type (can also be an interface)
type IBlog = {
    title: string;
    slug: string; 
    date: Date;
    description: string; // for preview
    content: string; // for individual blog page
};


// mongoose schema 
const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, required: false, default: new Date()},
    description: { type: String, required: true },
    content: { type: String, required: true },
})

// defining the collection and model
const Blog = mongoose.models['blogs'] ||
mongoose.model('blogs', blogSchema);

export default Blog;