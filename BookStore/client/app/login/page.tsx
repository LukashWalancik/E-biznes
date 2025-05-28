// client/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

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
          <p style={{ marginTop: '20px' }}>
            Nie masz konta? <Link href="/register">Zarejestruj się</Link>
          </p>
        </div>
      </div>
    </main>
  );
}