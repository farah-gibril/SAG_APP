import MaxWidthWrapper from 'components/MaxWidthWrapper'
import { buttonVariants } from 'components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle } from 'lucide-react'

const Page = () => {
  // Placeholder for user authentication check
  const user = null; // Will replace later

  const pricingItem = {
    plan: 'Pro',
    tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 49, // Example price in dollars
    quota: 100, // Example quota
    features: [
      { text: 'Curabitur non nulla sit amet nisl tempus.', footnote: 'Additional details about this feature.' },
      { text: 'Pellentesque in ipsum id orci porta dapibus.' },
      { text: 'Vivamus suscipit tortor eget felis porttitor volutpat.' },
      { text: 'Sed porttitor lectus nibh.' },
      { text: 'Cras ultricies ligula sed magna dictum porta.' }
    ],
  };

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
            Pricing
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10'>
          <TooltipProvider>
            <div className='relative rounded-2xl bg-white shadow-lg border-2 border-blue-600 shadow-blue-200'>
              <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                Upgrade now
              </div>

              <div className='p-5'>
                <h3 className='my-3 text-center font-display text-3xl font-bold'>
                  {pricingItem.plan}
                </h3>
                <p className='text-gray-500'>
                  {pricingItem.tagline}
                </p>
                <p className='my-5 font-display text-6xl font-semibold'>
                  ${pricingItem.price}
                </p>
                <p className='text-gray-500'>
                  per month
                </p>
              </div>

              <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                <div className='flex items-center space-x-1'>
                  <p>
                    {pricingItem.quota.toLocaleString()} items/mo included
                  </p>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger className='cursor-default ml-1.5'>
                      <HelpCircle className='h-4 w-4 text-zinc-500' />
                    </TooltipTrigger>
                    <TooltipContent className='w-80 p-2'>
                      Quota description or any additional info.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <ul className='my-10 space-y-5 px-8'>
                {pricingItem.features.map(({ text, footnote }) => (
                  <li key={text} className='flex space-x-5'>
                    <div className='flex-shrink-0'>
                      <Check className='h-6 w-6 text-blue-500' />
                    </div>
                    {footnote ? (
                      <div className='flex items-center space-x-1'>
                        <p className='text-gray-600'>{text}</p>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className='cursor-default ml-1.5'>
                            <HelpCircle className='h-4 w-4 text-zinc-500' />
                          </TooltipTrigger>
                          <TooltipContent className='w-80 p-2'>
                            {footnote}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <p className='text-gray-600'>{text}</p>
                    )}
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
                })}>
                  {user ? 'Upgrade now' : 'Sign up'}
                  <ArrowRight className='h-5 w-5 ml-1.5' />
                </Link>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Page
