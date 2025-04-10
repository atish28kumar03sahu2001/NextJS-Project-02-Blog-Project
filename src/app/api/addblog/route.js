import connectToDB from "@/database";
import Blogs from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

export async function POST(req, res) {
    try {
        await connectToDB();
        const extractBlogData = await req.json();
        const {title, description} = extractBlogData;
        const {error} = AddNewBlog.validate({
            title, description
        })
        if(error) {
           return NextResponse.json({
            success: false,
            message: error.details[0].message
           })
        }
        const NewBlog = await Blogs.create(extractBlogData);
        if(NewBlog) {
            return NextResponse.json({
                success: true,
                message: "Blog Added Successfully"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong! Please Try Again"
           })
        }

    } catch (error) {
       console.log(error); 
       return NextResponse.json({
            success: false,
            message: "Something Went Wrong! Please Try Again"
       })
    }
}