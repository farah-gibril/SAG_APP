import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    try {
      console.log('Executing authCallback query');
      
      const session = await getKindeServerSession();
      console.log('Session:', session);
  
      const user = await session.getUser();
      console.log('User:', user);
  
      if (!user || !user.id || !user.email || !user.given_name || !user.family_name) {
        console.error('Unauthorized: User data is missing');
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
  
      // Check if the user exists in the database
      let dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });
  
      // If the user doesn't exist, create a new user in the database
      if (!dbUser) {
        console.log('Creating new user in the database');
        dbUser = await db.user.create({
          data: {
            id: user.id,
            email: user.email,
            firstName: user.given_name,
            lastName: user.family_name,
          },
        });
      } else {
        console.log('User already exists in the database');
      }
  
      console.log('Returning from authCallback query');
      return { success: true, userId: user.id };
    } catch (error) {
      console.error('Error in authCallback:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  updatePhoneNumber: publicProcedure
    .input(z.object({ userId: z.string(), phoneNumber: z.string() }))
    .mutation(async ({ input }) => {
      const { userId, phoneNumber } = input;

      console.log('Updating phone number for user:', userId);
      await db.user.update({
        where: { id: userId },
        data: { phoneNumber },
      });

      console.log('Phone number updated successfully');
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;