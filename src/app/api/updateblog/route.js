import connectToDB from "@/database";
import Blogs from "@/models/blog";
import { NextResponse } from "next/server";
import Joi from "joi";
const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})
export async function PATCH (req) {
    try {
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const getCurrentId = searchParams.get('id');
        if(!getCurrentId) {
            return NextResponse.json({
                succes: false,
                message: "Blog Id Is Required!",
            })
        }
        const {title, description} = await req.json();
        const {error} = EditBlog.validate({
            title, description,
        })
        if(error) {
            return NextResponse.json({
                succes: false,
                message: error.details[0].message,
            })
        }
        const updateBlogByBlogId = await Blogs.findOneAndUpdate({
            _id: getCurrentId,
        }, {title, description}, {new: true})
        if(updateBlogByBlogId) {
            return NextResponse.json({
                success: true,
                message: "Blog Updated Successfully!",
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong!",
            }) 
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong!",
        })
    }
}