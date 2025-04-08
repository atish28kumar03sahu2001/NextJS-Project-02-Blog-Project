"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../addnewBlog";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
const initialBlogFormData = {
  title: "",
  description: "",
};
export default function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [BlogFormData, SetBlogFormData] = useState(initialBlogFormData);
  const [CurrentEditedBlogId, SetCurrentEditedBlogId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse =
        CurrentEditedBlogId !== null
          ? await fetch(`/api/updateblog/?id=${CurrentEditedBlogId}`, {
              method: "PATCH",
              body: JSON.stringify(BlogFormData),
            })
          : await fetch("/api/addblog", {
              method: "POST",
              body: JSON.stringify(BlogFormData),
            });
      const result = await apiResponse.json();
      if (result.success) {
        SetBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        SetCurrentEditedBlogId(null);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      SetBlogFormData(initialBlogFormData);
    }
  }

  async function HandleDeleteBlog(getCurrentId) {
    try {
      const apiResponse = await fetch(`/api/deleteblog?id=${getCurrentId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function HandleEditBlog(BlogItem) {
    SetCurrentEditedBlogId(BlogItem?._id);
    SetBlogFormData({
      title: BlogItem?.title,
      description: BlogItem?.description,
    });
    setOpenBlogDialog(true);
  }
  return (
    <>
      <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-red-400 to-purple-600 p-6">
        <AddNewBlog
          openBlogDialog={openBlogDialog}
          setOpenBlogDialog={setOpenBlogDialog}
          Loading={Loading}
          setLoading={setLoading}
          BlogFormData={BlogFormData}
          SetBlogFormData={SetBlogFormData}
          handleSaveBlogData={handleSaveBlogData}
          initialBlogFormData={initialBlogFormData}
          CurrentEditedBlogId={CurrentEditedBlogId}
          SetCurrentEditedBlogId={SetCurrentEditedBlogId}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogList && blogList.length > 0 ? (
            blogList.map((blogItem) => (
              <Card key={blogItem?._id} className="p-5">
                <CardContent>
                  <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                  <CardDescription>{blogItem?.description}</CardDescription>
                  <div className="mt-5 flex gap-5 items-center">
                    <Button onClick={() => HandleEditBlog(blogItem)}>
                      Edit
                    </Button>
                    <Button onClick={() => HandleDeleteBlog(blogItem?._id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Label className="text-2xl font-extrabold">
              No Blog Found! Add One Blog
            </Label>
          )}
        </div>
      </div>
    </>
  );
}
