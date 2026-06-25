'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { FiMail, FiUser, FiDollarSign, FiPhone, FiMapPin, FiUsers, FiEdit2 } from 'react-icons/fi';
import { trpc } from '@/app/_trpc/client';

interface PageProps {
  user: {
    id: string;
    email: string;
    stripePriceId: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    address: string | null;
    familyMembers: number | null;
  };
}

const Dashboard = ({ user }: PageProps) => {
  const router = useRouter();
  const updateUserDetails = trpc.updateUserDetails.useMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [address, setAddress] = useState(user.address || '');
  const [familyMembers, setFamilyMembers] = useState(
    user.familyMembers != null ? String(user.familyMembers) : ''
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-open the popup for existing accounts that are missing the new details.
  useEffect(() => {
    if (!user.address || user.familyMembers == null) {
      setIsModalOpen(true);
    }
  }, [user.address, user.familyMembers]);

  const validatePhoneNumber = (value: string) => {
    const australianPhoneNumberRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    return australianPhoneNumberRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Australian phone number.');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your address.');
      return;
    }
    const familyMembersNum = Number(familyMembers);
    if (familyMembers === '' || !Number.isInteger(familyMembersNum) || familyMembersNum < 0) {
      setError('Please enter a valid number of family members.');
      return;
    }

    try {
      setIsLoading(true);
      await updateUserDetails.mutateAsync({
        userId: user.id,
        phoneNumber,
        address: address.trim(),
        familyMembers: familyMembersNum,
      });
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Error updating user details:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Dashboard</h1>
      </div>

      {user ? (
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
              <button
                onClick={() => {
                  setError('');
                  setPhoneNumber(user.phoneNumber || '');
                  setAddress(user.address || '');
                  setFamilyMembers(user.familyMembers != null ? String(user.familyMembers) : '');
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                <FiEdit2 className="h-4 w-4 mr-2" />
                Edit Details
              </button>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <FiUser className="h-5 w-5 mr-2" />
                    Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'N/A'}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <FiMail className="h-5 w-5 mr-2" />
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <FiPhone className="h-5 w-5 mr-2" />
                    Phone Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phoneNumber || 'N/A'}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <FiMapPin className="h-5 w-5 mr-2" />
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.address || 'N/A'}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <FiUsers className="h-5 w-5 mr-2" />
                    Number of Family Members
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.familyMembers != null ? user.familyMembers : 'N/A'}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <FiDollarSign className="h-5 w-5 mr-2" />
                    Subscription Price
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.stripePriceId || 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton height={200} className="my-2" />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-center">Complete Your Account Details</h2>
            <p className="text-gray-600 mb-6 text-center text-sm">
              Please confirm your phone number, address and number of family members.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="familyMembers" className="block text-gray-700 font-semibold mb-2">
                  Number of Family Members
                </label>
                <input
                  type="number"
                  id="familyMembers"
                  min={0}
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex gap-3">
                {user.address && user.familyMembers != null && (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-60"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
