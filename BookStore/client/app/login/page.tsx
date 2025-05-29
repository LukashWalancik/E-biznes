// client/app/login/page.tsx
"use client";

import { useState, useEffect } from 'react'; // Dodaj useEffect
import { useRouter, useSearchParams } from 'next/navigation'; // Dodaj useSearchParams
import Link from 'next/link';
import Image from 'next/image'; // Jeśli będziesz używać ikony Google

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook do odczytu parametrów URL

  useEffect(() => {
    // Sprawdź, czy są parametry z callbacku Google
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const firstName = searchParams.get('first_name');
    const lastName = searchParams.get('last_name');

    if (token && email && firstName && lastName) {
      // Jeśli tokeny są, oznacza to pomyślne logowanie przez Google
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', `${firstName} ${lastName}`);
      setMessage('Logowanie przez Google udane! Witaj ponownie.');
      router.push('/'); // Przekieruj na stronę główną
    } else if (token && !email) {
      // Możliwy scenariusz błędu lub niepełnych danych z Google
      setMessage('Logowanie przez Google zakończone, ale brakuje niektórych danych.');
    }
  }, [searchParams, router]); // Uruchom, gdy zmieniają się parametry URL lub router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch('http://localhost:1323/login', { // Endpoint logowania
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Logowanie udane! Witaj ponownie.');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.first_name + ' ' + data.last_name); // Zapisz imię i nazwisko

        router.push('/'); // Przekieruj na stronę główną po zalogowaniu
      } else {
        setMessage(`Błąd logowania: ${data.message || 'Nieznany błąd'}`);
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
      setMessage('Wystąpił błąd podczas komunikacji z serwerem.');
    }
  };

  const handleGoogleLogin = () => {
    // Przekieruj użytkownika do endpointu Google OAuth na Twoim backendzie Go
    window.location.href = 'http://localhost:1323/auth/google';
  };

  return (
    <main>
      <div className="card-container">
        <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
          <h3 className="card-header">Logowanie</h3>
          {message && <p style={{ color: message.includes('Błąd') ? 'red' : 'green' }}>{message}</p>}
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Hasło:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="add-to-cart-button" style={{ marginTop: '20px' }}>
              Zaloguj się
            </button>
          </form>

          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <button onClick={handleGoogleLogin} className="google-signin-button">
              {/* Możesz użyć obrazka logo Google here */}
              <Image src="/google-logo.png" alt="Google logo" width={20} height={20} style={{ marginRight: '10px' }} />
              Zaloguj się z Google
            </button>
          </div>

          <p style={{ marginTop: '20px' }}>
            Nie masz konta? <Link href="/register">Zarejestruj się</Link>
          </p>
        </div>
      </div>
    </main>
  );
}