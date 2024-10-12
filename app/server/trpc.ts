import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client/extension';

const prisma = new PrismaClient();

const t = initTRPC.context<{ prisma: PrismaClient; userId?: string }>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
