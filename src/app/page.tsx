/* eslint-disable react/no-unescaped-entities */
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-20 py-8 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-4xl font-semibold text-gray-700">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Somali{' '}
          <span className="text-blue-600">Association</span>{' '}
          Graves
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          SAG is owned by the Somali Muslim Community. This Organisation was built by Somali people in late 1997 for the local Somali community. As a member of SAG you are entitled to discount on Muslim graves provided by the SAG Victoria residing in a location in Victoria.
        </p>
      </MaxWidthWrapper>

      {/* Value Proposition Section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h2 className="text-2xl font-bold mb-4">The conditions to be a member are:</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>He/She must be of Somali origin (one parent or both must be Somali)</li>
                    <li>Must be in a stable health condition (Don't wait until a person is critically ill or in hospital to become a member)</li>
                    <li>Must be a Sunni Muslim</li>
                    <li>Must pay the Membership fee every year between the period of July - end of September. Any payments made after this period are considered late, and a late fee will be applied.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-6 mb-4">The costs of being a member are:</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>A family (father, mother, their children, and grandparents) living within the same address costs $150.</li>
                    <li>One or two people sharing a house cost $150.</li>
                    <li>Children not living with a family at the same address must also pay $150.</li>
                    <li>All new members need to pay a $50 admin fee plus the regular membership fee of $150, totaling $200.  **CAN WE APPLY THIS?**</li>
                  </ul>

                  {!user ? (
                    <RegisterLink
                      className={buttonVariants({
                        size: 'lg',
                        className: 'mt-5',
                      })}
                    >
                      Become a member now!{' '}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RegisterLink>
                  ) : (
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        size: 'lg',
                        className: 'mt-5',
                      })}
                    >
                      View your account{' '}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Learn About Pricing Section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-15 text-center">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">Learn About Pricing</h2>
        <p className="mt-4 text-lg text-gray-600">
          To learn about the pricing, press the link below:
        </p>
        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href="/pricing"
        >
          Pricing Page <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            For any further inquiries, please contact SAG with the numbers below:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Abdifitah Ahmed Hashi</h3>
              <p className="mt-2 text-gray-700">0411 303 932</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Abukar Haji Abow</h3>
              <p className="mt-2 text-gray-700">0423 377 967</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Hassan Ali Hassan</h3>
              <p className="mt-2 text-gray-700">0402 416 442</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Hassan Farah Gibril</h3>
              <p className="mt-2 text-gray-700">0431 551 353</p>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Home;