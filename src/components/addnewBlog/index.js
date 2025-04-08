"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  BlogFormData,
  SetBlogFormData,
  handleSaveBlogData,
  initialBlogFormData,
  CurrentEditedBlogId,
  SetCurrentEditedBlogId,
}) {
  return (
    <>
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
      </div>
      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          SetBlogFormData(initialBlogFormData);
          SetCurrentEditedBlogId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {CurrentEditedBlogId ? "Edit New Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Blog Title
              </Label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                placeholder="Add Blog Title"
                value={BlogFormData.title}
                onChange={(event) =>
                  SetBlogFormData({
                    ...BlogFormData,
                    title: event.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Blog Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                placeholder="Add Blog Description"
                value={BlogFormData.description}
                onChange={(event) =>
                  SetBlogFormData({
                    ...BlogFormData,
                    description: event.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveBlogData}>
              {CurrentEditedBlogId ? "Edit Blog" : "Add Blog"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
