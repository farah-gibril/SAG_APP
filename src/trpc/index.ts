import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({
 authCallback: publicProcedure.query(async () => {
   const session = await getKindeServerSession();
   const user = await session.getUser();

   if (!user || !user.id || !user.email)
     throw new TRPCError({ code: 'UNAUTHORIZED' })

   // Check if the user exists in the database
   const dbUser = await db.user.findFirst({
     where: {
       id: user.id,
     },
   })

   // If the user doesn't exist, create a new user in the database
   if (!dbUser) {
     await db.user.create({
       data: {
         id: user.id,
         email: user.email,
       },
     })
   }

   return { success: true }
 }),
});

export type AppRouter = typeof appRouter;