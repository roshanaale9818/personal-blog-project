import Image from "next/image";
import EditBlog from "~/app/_components/update-blog";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Blog } from "~/types/Model";

export default async function BlogDetail({
  params,
}: {
  params: { id: string[] };
}) {
  console.log(params)
  const session = await getServerAuthSession();

  const [blogId] = params.id;
  console.log(blogId)
  if (!blogId) return <div>Cannot find blogId</div>;

  if(!Number(blogId)) return <div>Invalid BlogId</div>
  const blog = await api.blog.getBlog({ id: blogId }) as Blog;
  console.log("session", session,blog);
  let actionContent;
  if (session?.user.id === blog?.createdById) {
    actionContent = (
      <div className="action">
        {/* <button className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Edit
        </button> */}
        <EditBlog blog={blog} />
      </div>
    );
  }
  if (!blog)
    return <div className="container mx-auto py-8"> Cannot find blog</div>;
  // console.log("detail",blog);
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-3xl font-semibold">Blog Detail</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div key={blog?.id} className="rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-center text-xl font-bold">{blog?.title}</h2>

          <div className="flex items-center">
            <Image
              className="h-48 w-full object-cover md:h-full"
              src="/default.png"
              alt="Blog image"
              width={200}
              height={200}
            />
          </div>

          <div className="description mt-2 flex items-center p-3">
            <h2 className="text-bold">{blog?.description}</h2>
          </div>

          <div className="content mt-4 flex items-center p-3">
            <p>{blog?.content}</p>
          </div>

          {actionContent}
        </div>
      </div>
    </div>
  );
}
