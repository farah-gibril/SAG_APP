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
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
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
      // Retrieve the payment intent to get the customer ID
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );

      // Ensure that the customer ID is available
      if (!paymentIntent.customer) {
        console.error('Customer ID missing in payment intent');
        return new Response(null, { status: 200 });
      }

      // Ensure amount_total is available
      const amountTotal = session.amount_total;
      if (amountTotal === null) {
        console.error('Amount total is null');
        return new Response('Amount total is null', { status: 400 });
      }

      // Update the user in the database
      await db.user.update({
        where: {
          id: session.metadata.userId,
        },
        data: {
          stripeCustomerId: paymentIntent.customer as string,
          stripePriceId: amountTotal.toString(),
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
