import mongoose from "mongoose";
const connectToDB = async () => {
    const connectionURL = "mongodb+srv://kumarsahuatishoff280301:lbps90LQuyoDWxQR@blogs.d7pmb.mongodb.net/?retryWrites=true&w=majority&appName=blogs"
    mongoose.connect(connectionURL)
        .then(() => console.log("Blog Database Connected!"))
        .catch(error => console.log(error))
}
export default connectToDB;