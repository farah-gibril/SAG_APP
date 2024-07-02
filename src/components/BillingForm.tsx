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
import { format } from 'date-fns';

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

  const handleManageSubscription = () => {
    if (!subscriptionPlan.slug) {
      toast({
        title: 'Error',
        description: 'Plan slug is missing',
        variant: 'destructive',
      });
      return;
    }

    createStripeSession({ planSlug: subscriptionPlan.slug });
  };

  return (
    <MaxWidthWrapper className='max-w-5xl'>
      <Card>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardDescription>
            {subscriptionPlan.isSubscribed
              ? `You have paid for the ${subscriptionPlan.name} plan.`
              : 'You have not made any payments yet.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p>Plan Quota: {subscriptionPlan.quota}</p>
        </CardContent>

        <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
          {subscriptionPlan.isSubscribed ? (
            <>
              <Button onClick={handleManageSubscription} disabled={isPending}>
                {isPending ? (
                  <Loader2 className='mr-4 h-4 w-4 animate-spin' />
                ) : null}
                Manage Subscription
              </Button>
              <p className='rounded-full text-xs font-medium'>
                {subscriptionPlan.isCanceled
                  ? 'Your plan will be canceled on '
                  : 'Your plan renews on '}
                {format(subscriptionPlan.stripeCurrentPeriodEnd!, 'dd.MM.yyyy')}.
              </p>
            </>
          ) : (
            <Button onClick={handleManageSubscription} disabled={isPending}>
              {isPending ? (
                <Loader2 className='mr-4 h-4 w-4 animate-spin' />
              ) : null}
              Make a Payment
            </Button>
          )}
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default BillingForm;
