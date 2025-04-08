import connectToDB from "@/database";
import Blogs from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        const extractAllBlogsFromDatabase = await Blogs.find({});
        if(extractAllBlogsFromDatabase) {
            return NextResponse.json({
                success: true,
                data: extractAllBlogsFromDatabase
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong! Please Try Again Later",
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong! Please Try Again Later",
        })
    }
}