import connectToDB from "@/database";
import Blogs from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        if(!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: "Blog ID Is Required!",
            })
        }
        const deleteCurrentBlogId = await Blogs.findByIdAndDelete(getCurrentBlogID);
        if(deleteCurrentBlogId) {
            return NextResponse.json({
                success: true,
                message: "Blog Deleted Successfully",
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong!"
            }) 
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong!"
        })
    }
}