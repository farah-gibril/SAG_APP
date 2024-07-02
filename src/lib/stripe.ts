import { PLANS } from '@/config/stripe';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
  typescript: true,
});

export async function getUserSubscriptionPlan() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      stripeCustomerId: null,
    };
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      stripeCustomerId: null,
    };
  }

  const isSubscribed = Boolean(dbUser.stripePriceId);

  const plan = isSubscribed
    ? PLANS.find((plan) => plan.price.priceIds.test === dbUser.stripePriceId)
    : null;

  return {
    ...plan,
    stripeCustomerId: dbUser.stripeCustomerId,
    isSubscribed,
  };
}
