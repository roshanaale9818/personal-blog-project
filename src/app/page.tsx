import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
// import { Blog } from "~/types/Model";
import Image from "next/image";
import NewBlog from "./_components/create-blog";

// import { GetServerSideProps } from "next";



export default async function Home() {

  const session = await getServerAuthSession();

  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Welcome to Personal Blog</p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in With Discord"}
              </Link>

              {session ?<NewBlog />:(" ")}

              {session ? (
                ""
              ) : (
                <p className="text-2xl text-white">
                  Login to create your blog.
                </p>
              )}
            </div>
          </div>

          {/* <CrudShowcase /> */}
          <BlogList />






        </div>
      </section>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;


  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}

async function BlogList() {
  // const session = await getServerAuthSession();
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
