import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const categoryroute = router({

  getALL: publicProcedure
    .query(async ({ ctx }) => {
      const allcategories = await ctx.prisma.Category.findMany();
      return allcategories;
    }),
  //getting a specific by id 
  getById: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const categById = await ctx.prisma.Category.findUnique({
        where: { id: input.id },
      });
      return categById;
    }),

  //new Category
  newCat: publicProcedure
    .input(z.object({
      name: z.string().min(3),
    }))
    .mutation(async ({ ctx, input }) => {
      const newCategory = await ctx.prisma.Category.create({
        data: {
          name: input.name,
        }
      })
      return newCategory;
    })
})
