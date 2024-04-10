import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";

export default async function BlogDetail (){
        //  const session = await getServerAuthSession();
  // if (!session?.user) return null;
  const blogs = await api.blog.getBlogs();
  console.log(blogs)

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-3xl font-semibold">Latest Blogs</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <div key={blog.id} className="rounded-md bg-white p-6 shadow-md">
              <h2 className="mb-2 text-center text-xl font-bold">
                {blog.title}
              </h2>
             
              <div className="flex items-center">
                <Image
                  className="h-48 w-full object-cover md:h-full"
                  src="/default.png"
                  alt="Blog image"
                  width={200}
                  height={200}
                />
              </div>

              <div>
                <p className="text-gray-700"> {blog.description} </p>
                <Link href={`/blog/${blog.id}`}
                  className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}