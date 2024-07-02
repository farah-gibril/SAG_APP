import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature') ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response(
      `Webhook Error: ${
        err instanceof Error ? err.message : 'Unknown Error'
      }`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    console.error('User ID missing in session metadata');
    return new Response(null, { status: 200 });
  }

  if (event.type === 'checkout.session.completed') {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );

      await db.user.update({
        where: {
          id: session.metadata.userId,
        },
        data: {
          stripeCustomerId: paymentIntent.customer as string,
        },
      });

      console.log(`User ${session.metadata.userId} updated with customer ID ${paymentIntent.customer}`);
    } catch (err) {
      console.error('Error updating user in database:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}
