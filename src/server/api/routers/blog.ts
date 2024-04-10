import { z } from "zod";

import {  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Blog } from '~/types/Model';

export const blogRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(async ({ctx})=>{
        // Fetch blogs from the database using Prisma
        const blogs: Blog[] = await ctx.db.blog.findMany();
        return blogs;
  }),

  create: protectedProcedure
    .input(z.object({ 
        title: z.string(),
        description:z.string(),
        content:z.string(),
     }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
        
      const data:Blog = {
        title: input.title,
        description:input.description,
        content:input.content,
        createdBy: { connect: { id: ctx.session.user.id } },
    }
    const res = await ctx.db.blog.create({
        data
       });
      return res;
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
