import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
})
const Blogs = mongoose.models.Blogs || mongoose.model('Blogs', BlogSchema);
export default Blogs;