import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const ProfileRouter = router({
  addProfile: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const newProfile = await ctx.prisma.User.create({
        data: {
          email: input.email,
          name: input.name
        },
      });
      return newProfile;
    }),
  deleteProfile: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const deleteUser = await ctx.prisma.User.delete({
        where: { id: input.id }
      });
      return deleteUser;
    })
})
