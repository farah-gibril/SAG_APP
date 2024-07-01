// src/app/auth-callback/page.tsx
import React, { Suspense } from 'react';
import AuthCallbackComponent from '@/components/AuthCallbackComponent';

const AuthCallbackPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthCallbackComponent />
  </Suspense>
);

export default AuthCallbackPage;
