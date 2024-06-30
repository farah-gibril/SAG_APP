'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';

const EnterPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const updatePhoneNumber = trpc.updatePhoneNumber.useMutation();

  const validatePhoneNumber = (phoneNumber: string) => {
    const australianPhoneNumberRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    return australianPhoneNumberRegex.test(phoneNumber);
  };

  const handlePhoneNumberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting phone number...');
    console.log('userId:', userId);
    console.log('phoneNumber:', phoneNumber);

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Australian phone number.');
      return;
    }

    if (userId) {
      try {
        setIsLoading(true);
        await updatePhoneNumber.mutateAsync({ userId, phoneNumber });
        console.log('Phone number updated successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error updating phone number:', error);
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('userId is missing');
      setError('User ID is missing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Complete Your Account Setup</h1>
        <p className="text-gray-600 mb-8 text-center">Please enter your phone number to complete your account setup.</p>
        <form onSubmit={handlePhoneNumberSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterPhoneNumber;