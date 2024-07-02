'use client';

import { getUserSubscriptionPlan } from '@/lib/stripe';
import { useToast } from './ui/use-toast';
import { trpc } from '@/app/_trpc/client';
import MaxWidthWrapper from './MaxWidthWrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {
  const { toast } = useToast();

  const { mutate: createStripeSession, isPending } =
    trpc.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) window.location.href = url;
        if (!url) {
          toast({
            title: 'There was a problem...',
            description: 'Please try again in a moment',
            variant: 'destructive',
          });
        }
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionPlan.price || !subscriptionPlan.slug) {
      toast({
        title: 'Error',
        description: 'No price information available for the selected plan',
        variant: 'destructive',
      });
      return;
    }
    createStripeSession({ planSlug: subscriptionPlan.slug });
  };

  return (
    <MaxWidthWrapper className='max-w-5xl'>
      <form className='mt-12' onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the <strong>{subscriptionPlan.name}</strong> plan.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p>Plan Quota: {subscriptionPlan.quota}</p>
            {subscriptionPlan.stripeAmountPaid && (
              <p>Amount Paid: ${(+subscriptionPlan.stripeAmountPaid / 100).toFixed(2)}</p> // Convert string to number
            )}
            {subscriptionPlan.stripePriceId && (
              <p>Price ID: {subscriptionPlan.stripePriceId}</p>
            )}
          </CardContent>

          <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader2 className='mr-4 h-4 w-4 animate-spin' />
              ) : null}
              {subscriptionPlan.isSubscribed
                ? 'Manage Subscription'
                : 'Make a Payment'}
            </Button>

            {subscriptionPlan.isSubscribed && (
              <p className='rounded-full text-xs font-medium'>
                Subscription is active.
              </p>
            )}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
};

export default BillingForm;
