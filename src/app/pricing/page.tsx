import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle } from 'lucide-react'

const Page = () => {
  // Placeholder for user authentication check
  const user = null; // Will replace later

  const pricingItems = [
    {
      plan: 'New Member',
      price: 200,
      description: 'New members need to pay a $50 admin fee plus the regular membership fee of $150, totaling $200.',
      features: [
        'Regular membership fee: $150',
        'Admin fee: $50',
        'Total: $200'
      ],
    },
    {
      plan: 'Standard Pricing (for existing members)',
      price: 150,
      description: 'This plan is for existing members looking to renew their membership, if you are a new member this plan does not apply to you',
      features: [
        'A family (father, mother, their children, and grandparents) living within the same address costs $150.',
        'One or two people sharing a house cost $150.',
        'Children not living with a family at the same address must also pay $150.'
      ],
    }
  ];

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
            Pricing
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Select the best plan that suits your needs and become a member of our community.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10'>
          <TooltipProvider>
            {pricingItems.map((item) => (
              <div key={item.plan} className='relative rounded-2xl bg-white shadow-lg border-2 border-blue-600 shadow-blue-200'>
                <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                  {item.plan.includes('New Member') ? 'New Member' : 'Renew now'}
                </div>

                <div className='p-5'>
                  <h3 className='my-3 text-center font-display text-3xl font-bold'>
                    {item.plan}
                  </h3>
                  <p className='text-gray-500'>
                    {item.description}
                  </p>
                  <p className='my-5 font-display text-6xl font-semibold'>
                    ${item.price}
                  </p>
                  <p className='text-gray-500'>
                    per year
                  </p>
                </div>

                <ul className='my-10 space-y-5 px-8'>
                  {item.features.map((feature, index) => (
                    <li key={index} className='flex space-x-5'>
                      <div className='flex-shrink-0'>
                        <Check className='h-6 w-6 text-blue-500' />
                      </div>
                      <p className='text-gray-600'>{feature}</p>
                    </li>
                  ))}
                </ul>

                <div className='border-t border-gray-200' />
                <div className='p-5'>
                  <Link
                    href={user ? '/dashboard' : '/sign-in'}
                    className={buttonVariants({
                      className: 'w-full',
                      variant: 'secondary',
                    })}
                  >
                    {user ? 'Renew now' : 'Sign up'}
                    <ArrowRight className='h-5 w-5 ml-1.5' />
                  </Link>
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
