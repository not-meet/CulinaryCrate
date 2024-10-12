import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const recipeRouter = router({
  Recipecreate: publicProcedure
    .input(z.object({
      title: z.string(),
      ingredients: z.string(),
      instructions: z.string(),
      categoryId: z.number(),
      imageUrl: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const newRecipe = await ctx.prisma.Recipe.create({
        data: {
          ...input,
          userId: ctx.userId!,
        }
      });
      return newRecipe;
    }),

  //for getting all the recipes
  AllRecipes: publicProcedure
    .query(async ({ ctx }) => {
      const recipes = await ctx.prisma.Recipe.findMany({
        include: { category: true, user: true },
      });
      return recipes
    }),

  //updating the recepies
  updateRecipes: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      ingredients: z.string().optional(),
      instructions: z.string().optional(),
      categoryId: z.number().optional(),
      imageUrl: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const updatedRecipe = await ctx.prisma.Recipe.update({
        where: { id: input.id },
        data: {
          title: input.title,
          ingredients: input.ingredients,
          instructions: input.instructions,
          categoryId: input.categoryId,
          imageUrl: input.imageUrl
        },
      })
      return updatedRecipe
    }),

  //delete the recipe 
  deleteRecipe: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const deleteRecipe = await ctx.prisma.Recipe.delete({
        where: { id: input.id },
      })
      return deleteRecipe
    })

})
