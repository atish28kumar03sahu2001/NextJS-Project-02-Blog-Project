import Link from "next/link";

export default function Home () {
    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-red-400 to-purple-600 p-6">
                <div className="container mx-auto flex flex-col justify-center items-center">
                    <h2 className="text-4xl text-white font-bold mb-4">
                        Browse Our Blog Collection
                    </h2>
                    <Link className="bg-white text-sm text-orange-600 font-semibold py-2 px-6 rounded" href={`/blogs`}>
                        Explore Blog
                    </Link>
                </div>
            </div>
        </>
    );
}