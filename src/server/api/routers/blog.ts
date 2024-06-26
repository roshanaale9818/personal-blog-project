import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

import { Blog } from '~/types/Model';



// Define the type for the result of the getBlogs query
type GetBlogsResult = Blog[];
export const blogRouter = createTRPCRouter({
    // getBlogs: publicProcedure.query(async ({ ctx }) => {
    //     // Fetch blogs from the database using Prisma
    //     const blogs: Blog[] = await ctx.db.blog.findMany();
    //     return blogs;
    // }),
    getBlogs: publicProcedure.query(async ({ ctx }): Promise<GetBlogsResult> => {
        // Fetch blogs from the database using Prisma
        const blogs: GetBlogsResult = await ctx.db.blog.findMany();
        return blogs;
    }),

    create: protectedProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            //   await new Promise((resolve) => setTimeout(resolve, 1000));

            const data: Blog = {
                title: input.title,
                description: input.description,
                content: input.content,
                createdBy: { connect: { id: ctx.session.user.id } },
                id: 0
            }
            const res = await ctx.db.blog.create({
                data: {

                    title: data.title,
                    description: data.description,
                    content: data.content,
                    createdBy: { connect: { id: ctx.session.user.id } },
                }
            });
            return res;
        }),
    update: protectedProcedure
        .input(z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const data = {
                title: input.title,
                description: input.description,
                content: input.content,
                id: Number(input.id)
            }
            const res = await ctx.db.blog.update({
                data,
                where: {
                    id: Number(input.id)
                }
            });
            return res;
        }),

    getLatest: protectedProcedure.query(({ ctx }) => {
        return ctx.db.post.findFirst({
            orderBy: { createdAt: "desc" },
            where: { createdBy: { id: ctx.session.user.id } },
        });
    }),

    delete: protectedProcedure
        .input(z.object({
            id: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {

            const res = await ctx.db.blog.delete({
                where: {
                    id: Number(input.id)
                }
            });
            return res;
        }),
    getBlog: publicProcedure.input(z.object({
        id: z.string()
    }
    )).query(({ ctx, input }) => {
        return ctx.db.blog.findUnique({
            where: { id: +input.id },
        });
    }),




    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),

    updateBlog: publicProcedure.input(z.object({
        id: z.string()
    }
    )).query(async ({ ctx, input }) => {
        const blog = await ctx.db.blog.findUnique({
            where: { id: +input.id },
        });
        if (!blog) { return "Blog cannot be found." };
        return ctx.db.post.findFirst({
            orderBy: { createdAt: "desc" },
            where: { createdBy: { id: ctx.session?.user.id } },
        });
    })
});


