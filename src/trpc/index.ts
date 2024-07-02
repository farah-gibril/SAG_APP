import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';
import { absoluteUrl } from '@/lib/utils';
import { stripe } from '@/lib/stripe';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || !user.email || !user.given_name || !user.family_name) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    let dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          firstName: user.given_name,
          lastName: user.family_name,
        },
      });
    }

    return { success: true, userId: user.id };
  }),

  createStripeSession: privateProcedure
    .input(z.object({ priceId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { priceId } = input;
      const { userId } = ctx;

      if (!userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User ID is missing' });
      }

      const dbUser = await db.user.findFirst({
        where: { id: userId },
      });

      if (!dbUser) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found in database' });
      }

      const billingUrl = absoluteUrl('/dashboard/billing');

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

      return { url: stripeSession.url };
    }),

  updatePhoneNumber: publicProcedure
    .input(z.object({ userId: z.string(), phoneNumber: z.string() }))
    .mutation(async ({ input }) => {
      const { userId, phoneNumber } = input;

      await db.user.update({
        where: { id: userId },
        data: { phoneNumber },
      });

      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;