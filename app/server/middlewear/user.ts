import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";


export const isLoggedin = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      name: ctx.userId,
    }
  })

  return opts.next({
    ctx: {
      user
    }
  })
})
