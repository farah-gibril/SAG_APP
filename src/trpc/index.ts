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

    console.log('-------- Starting createStripeSession --------');
    console.log(`Input - priceId: ${priceId}`);
    console.log(`Context - userId: ${userId}`);

    try {
      console.log('Generating billingUrl...');
      const billingUrl = absoluteUrl('/dashboard/billing');
      console.log(`Generated billingUrl: ${billingUrl}`);

      if (!userId) {
        console.error('Error: userId is missing from context');
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User ID is missing' });
      }

      console.log(`Fetching user from database for userId: ${userId}`);
      const dbUser = await db.user.findFirst({
        where: { id: userId },
      });

      if (!dbUser) {
        console.error(`Error: No user found in database for userId: ${userId}`);
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found in database' });
      }
      console.log('User found in database:', JSON.stringify(dbUser, null, 2));

      console.log('Initializing Stripe checkout session creation...');
      console.log('Stripe configuration:', {
        apiKey: `${process.env.STRIPE_SECRET_KEY?.substring(0, 8)}...`, // Only log first 8 characters for security
      });

      console.log('Creating Stripe checkout session with params:', {
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ['card'],
        mode: 'payment',
        billing_address_collection: 'auto',
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId },
      });

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

      console.log('Stripe checkout session created successfully');
      console.log('Stripe session details:', {
        id: stripeSession.id,
        url: stripeSession.url,
        status: stripeSession.status,
      });

      console.log('-------- Completed createStripeSession --------');
      return { url: stripeSession.url };
    } catch (error) {
      console.error('-------- Error in createStripeSession --------');
      console.error('Error details:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack trace:', error.stack);
      }
      if (error instanceof stripe.errors.StripeError) {
        console.error('Stripe error type:', error.type);
        console.error('Stripe error code:', error.code);
        console.error('Stripe error param:', error.param);
      }
      console.error('Environment variables:', {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_URL: process.env.VERCEL_URL,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set',
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? 'Set' : 'Not set',
      });
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while creating the Stripe session',
        cause: error,
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