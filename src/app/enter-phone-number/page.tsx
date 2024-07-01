// src/app/enter-phone-number/page.tsx
import React, { Suspense } from 'react';
import EnterPhoneNumber from '@/components/EnterPhoneNumber';

const EnterPhoneNumberPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EnterPhoneNumber />
  </Suspense>
);

export default EnterPhoneNumberPage;
