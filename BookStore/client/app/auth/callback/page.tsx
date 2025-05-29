'use client'; // Jeśli używasz App Router, a komponent korzysta z hooków Reacta

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Dla App Router
// import { useRouter } from 'next/router'; // Dla Pages Router

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Dla App Router
  // const { query } = useRouter(); // Dla Pages Router, potem query.token, query.email itd.

  useEffect(() => {
    // App Router:
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const firstName = searchParams.get('first_name');
    const lastName = searchParams.get('last_name');

    // Pages Router:
    // const { token, email, first_name, last_name } = query;

    if (token) {
      // Zapisz token do localStorage
      localStorage.setItem('authToken', token);

      // Opcjonalnie: zapisz inne dane użytkownika
      localStorage.setItem('userEmail', email || '');
      localStorage.setItem('userFirstName', firstName || '');
      localStorage.setItem('userLastName', lastName || '');

      // Przekieruj użytkownika na inną stronę
      router.replace('/'); // Przekieruj na stronę główną
      // router.replace('/dashboard'); // Albo na inną stronę, np. profilową
    } else {
      // Obsługa błędu, jeśli token nie został znaleziony
      console.error("Token not found in URL parameters.");
      router.replace('/login'); // Przekieruj z powrotem na stronę logowania
    }
  }, [searchParams, router]); // Zależności dla useEffect (App Router)
  // }, [query, router]); // Zależności dla useEffect (Pages Router)

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Logowanie w toku...</h2>
      <p>Trwa przekierowanie...</p>
    </div>
  );
}