// client/app/register/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    city: '',
    zipCode: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

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
      const response = await fetch('http://localhost:1323/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          street: formData.street,
          city: formData.city,
          zip_code: formData.zipCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Rejestracja udana! Zostałeś zalogowany.');
        login(data.token, `${data.first_name} ${data.last_name}`, data.email); 

        router.push('/');
      } else {
        setMessage(`Błąd rejestracji: ${data.message || 'Nieznany błąd'}`);
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
      setMessage('Wystąpił błąd podczas komunikacji z serwerem.');
    }
  };

  if (isAuthenticated) {
    return (
      <main>
        <div className="card-container">
          <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
            <h3 className="card-header">Rejestracja</h3>
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
          <h3 className="card-header">Rejestracja</h3>
          {message && <p style={{ color: message.includes('Błąd') ? 'red' : 'green' }}>{message}</p>}
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="firstName">Imię:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nazwisko:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="street">Ulica:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Miasto:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Kod Pocztowy:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <button type="submit" className="add-to-cart-button" style={{ marginTop: '20px' }}>
              Zarejestruj się
            </button>
          </form>
          <p style={{ marginTop: '20px' }}>
            Masz już konto? <Link href="/login">Zaloguj się</Link>
          </p>
        </div>
      </div>
    </main>
  );
}