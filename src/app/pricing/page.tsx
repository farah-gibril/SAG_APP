import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import UpgradeButton from '@/components/UpgradeButton';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PLANS } from '@/config/stripe';
import { cn } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  ArrowRight,
  Check,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const pricingItems = [
    {
      plan: 'Membership',
      tagline: 'For all members.',
      quota: PLANS.find((p) => p.slug === 'membership-200')!.quota,
      features: [
        'Regular membership fee: $150',
        'Admin fee: $50',
        'Transaction fee: $3.8',
        'Total: $203.8',
      ],
      slug: 'membership-200',
    }
  ];

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>Pricing</h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Select the best plan that suits your needs and become a member of our community.
          </p>
        </div>
        <div className='pt-12 flex justify-center items-center'>
          <TooltipProvider>
            <div className='w-full max-w-md'>
              {pricingItems.map(({ plan, tagline, quota, features, slug }) => {
                const price = slug === 'membership-200' ? 203.8 : 152.85;
                return (
                  <div
                    key={plan}
                    className={cn('relative rounded-2xl bg-white shadow-lg', {
                      'border-2 border-blue-600 shadow-blue-200': plan === 'Membership 200',
                      'border border-gray-200': plan !== 'Membership 200',
                    })}
                  >
                    {plan === 'Membership 200' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                        New Member
                      </div>
                    )}
                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>{plan}</h3>
                      <p className='text-gray-500'>{tagline}</p>
                      <p className='my-5 font-display text-6xl font-semibold'>${price}</p>
                      <p className='text-gray-500'>per year</p>
                    </div>
                    <ul className='my-10 space-y-5 px-8'>
                      {features.map((text, index) => (
                        <li key={index} className='flex space-x-5'>
                          <div className='flex-shrink-0'>
                            <Check className='h-6 w-6 text-blue-500' />
                          </div>
                          <p className='text-gray-600'>{text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {user ? (
                        <UpgradeButton planSlug={slug} />
                      ) : (
                        <Link
                          href='/sign-in'
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}
                        >
                          Sign up
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
