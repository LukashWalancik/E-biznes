// client/app/auth/callback/page.tsx
"use client";

import { useEffect, Suspense } from 'react'; // Dodajemy import Suspense
import { useRouter, useSearchParams } from 'next/navigation';

// Wydzielamy logikę używającą useSearchParams do osobnego komponentu
function AuthCallbackContent() {
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

      const fullUserName = `${firstName || ''} ${lastName || ''}`.trim();
      localStorage.setItem('userName', fullUserName);

      router.push('/');
    } else {
      console.error("Token not found in URL parameters.");
      router.push('/login?message=Błąd logowania: brak tokena.');
    }
  }, [searchParams, router]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Logowanie w toku...</h2>
      <p>Trwa przekierowanie...</p>
    </div>
  );
}

// Główny eksport strony, który teraz otacza AuthCallbackContent w Suspense
export default function AuthCallbackPage() {
  return (
    // <Suspense> z fallbackiem, który pokaże się, dopóki komponent AuthCallbackContent
    // nie będzie mógł być w pełni wyrenderowany (np. gdy useSearchParams będzie dostępne)
    <Suspense fallback={<div>Ładowanie danych uwierzytelniających...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}