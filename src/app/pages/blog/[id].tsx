import Image from "next/image";
import { api } from "~/trpc/server";

export default async function BlogDetail (){
        const blog = await api.blog.getBlogs();
      
        return (
          <div className="container mx-auto py-8">
            <h1 className="mb-4 text-3xl font-semibold">Latest Blogs</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              
                  <div key={blog[0].id} className="rounded-md bg-white p-6 shadow-md">
                    <h2 className="mb-2 text-center text-xl font-bold">
                      {blog[0].title}
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
                  </div>
            </div>
          </div>
        );
}