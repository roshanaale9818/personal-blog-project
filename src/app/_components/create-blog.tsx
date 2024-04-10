"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
const NewBlog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const resetForm = () => {
    setIsOpen(false);
    setTitle("");
    setContent("");
    setDescription('');
  };

  const createBlog = api.blog.create.useMutation({
    onSuccess: () => {
        alert("Blog Created Successfull");
        router.refresh();
        resetForm();
    },
  });



  return (
    <div className="flex items-center justify-center">
      <button
        className="transform rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-md transition duration-300 ease-in-out hover:scale-110"
        onClick={toggleModal}
      >
        Add New Blog
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
          <div className="z-9 absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="z-20 w-full max-w-md rounded-md bg-white p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black">Add New Blog</h2>
              <button
                onClick={toggleModal}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                createBlog.mutate({title,description,content})
            }}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  color="black"
                  id="title"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  color="black"
                  id="desc"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="mr-2 rounded-md bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400 focus:outline-none"
                disabled ={createBlog.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none"               
                >
                         {createBlog.isPending ? "Submitting..." : "Submit"}

                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBlog;
