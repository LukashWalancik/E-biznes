// client/app/login/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const firstName = searchParams.get('first_name');
    const lastName = searchParams.get('last_name');
    const queryMessage = searchParams.get('message');

    if (queryMessage) {
        setMessage(queryMessage);
    }

    if (token && email && firstName && lastName) {
      login(token, `${firstName} ${lastName}`, email); 
      setMessage('Logowanie przez Google udane! Witaj ponownie.');
      router.push('/');
    } else if (token && !email) {
      setMessage('Logowanie przez Google zakończone, ale brakuje niektórych danych.');
    }
  }, [searchParams, router, login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:1323/login', {
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
        login(data.token, `${data.first_name} ${data.last_name}`, data.email); 

        router.push('/');
      } else {
        setMessage(`Błąd logowania: ${data.message || 'Nieznany błąd'}`);
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
      setMessage('Wystąpił błąd podczas komunikacji z serwerem.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:1323/auth/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:1323/auth/github';
  };

  if (isAuthenticated) {
    return (
      <main>
        <div className="card-container">
          <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
            <h3 className="card-header">Logowanie</h3>
            <p>Jesteś już zalogowany. Przekierowuję...</p>
          </div>
        </div>
      </main>
    );
  }

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
              <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} style={{ marginRight: '10px' }} />
              Zaloguj się z Google
            </button>
            <button onClick={handleGithubLogin} className="github-signin-button">
              <Image src="/github-mark-white.svg" alt="GitHub logo" width={20} height={20} style={{ marginRight: '10px' }} />
              Zaloguj się z GitHub
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