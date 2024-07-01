import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';
import { absoluteUrl } from '@/lib/utils';
import { stripe } from '@/lib/stripe';

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

  createStripeSession: privateProcedure
    .input(z.object({ priceId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { priceId } = input;
      const { userId } = ctx;

      console.log('Creating Stripe session for user:', userId, 'with priceId:', priceId);

      try {
        const billingUrl = absoluteUrl('/dashboard/billing');

        if (!userId) {
          console.error('Unauthorized: userId is missing');
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        console.log('Fetching user from the database with userId:', userId);
        const dbUser = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!dbUser) {
          console.error('Unauthorized: User not found in the database');
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        console.log('Creating Stripe checkout session with priceId:', priceId);
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ['card'],
          mode: 'payment',
          billing_address_collection: 'auto',
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          metadata: {
            userId: userId,
          },
        });

        console.log('Stripe checkout session created. URL:', stripeSession.url);
        return { url: stripeSession.url };
      } catch (error) {
        console.error('Error creating Stripe session:', error);
        if (error instanceof Error) {
          console.error('Error details:', error.message);
          console.error('Error stack trace:', error.stack);
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while creating the Stripe session',
        });
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