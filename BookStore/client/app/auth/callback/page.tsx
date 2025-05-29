'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const firstName = searchParams.get('first_name');
    const lastName = searchParams.get('last_name');

    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email || '');
      localStorage.setItem('userFirstName', firstName || '');
      localStorage.setItem('userLastName', lastName || '');

      router.replace('/');
    } else {
      console.error("Token not found in URL parameters.");
      router.replace('/login');
    }
  }, [searchParams, router]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Logowanie w toku...</h2>
      <p>Trwa przekierowanie...</p>
    </div>
  );
}