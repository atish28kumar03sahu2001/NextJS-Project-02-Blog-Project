import BlogOverview from "@/components/blogOverview";
async function fetchListOfBlogs () {
   try {
    const apiResponse =  await fetch('https://next-js-project-02-blog-project.vercel.app/api/getblog',{
        method: 'GET',
        cache: 'no-store'
    });
    const result = await apiResponse.json();
    return result?.data;
   } catch (error) {
    throw new Error(error);
   } 
}
export default async function Blogs () {
    const blogList = await fetchListOfBlogs();
    return (
        <>
            <BlogOverview blogList={blogList} />
        </>
    );
}
// 