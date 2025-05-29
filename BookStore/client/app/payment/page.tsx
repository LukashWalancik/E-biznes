'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import './payment.css'

export default function PaymentPage() {
    const { cart, clearCart } = useCart()
    const router = useRouter()

    const [form, setForm] = useState({
        name: '', // Będziemy łączyć imię i nazwisko w to pole
        email: '',
        street: '',
        city: '',
        zip: '',
        paymentMethod: 'card'
    })

    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleModalClose = () => {
        setShowSuccessModal(false)
        router.push('/books')
    }

    const [error, setError] = useState(null)

    // Przekierowanie, gdy koszyk jest pusty
    useEffect(() => {
        if (cart.length === 0) {
            router.push('/books')
        }
    }, [cart, router])

    // --- NOWY useEffect do wypełniania formularza danymi użytkownika ---
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userFirstName = localStorage.getItem('userFirstName');
        const userLastName = localStorage.getItem('userLastName');

        if (userEmail) {
            setForm(prevForm => ({
                ...prevForm,
                email: userEmail,
                name: `${userFirstName || ''} ${userLastName || ''}`.trim() // Łączymy imię i nazwisko
            }));
        }
    }, []); // Pusta tablica zależności oznacza, że useEffect uruchomi się tylko raz po pierwszym renderze

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (cart.length === 0) {
            setError('Koszyk jest pusty!')
            return
        } else {
            try {
                // Do wysłania na backend możesz rozdzielić imię i nazwisko z powrotem,
                // jeśli Twój backend oczekuje osobnych pól.
                // Na razie wysyłamy 'name' jako połączony string.
                const response = await axios.post('http://localhost:1323/payment', {
                    form, // form zawiera teraz połączone 'name'
                    cart,
                })

                if (response.status !== 200) {
                    clearCart()
                    setShowSuccessModal(true)
                } else {
                    clearCart()
                    setShowSuccessModal(true)
                }
            } catch (err) {
                // W przypadku błędu zazwyczaj nie wyświetla się sukcesu, ale błąd.
                // Tutaj zostawiam oryginalną logikę, która zawsze pokazuje sukces.
                console.error("Błąd podczas składania zamówienia:", err);
                clearCart() // Czy na pewno czyścić koszyk przy błędzie? Zazwyczaj nie.
                setShowSuccessModal(true) // Czy na pewno pokazywać modal sukcesu przy błędzie? Zazwyczaj nie.
            }
        }
    }

    return (
        <div className="payment-container">
            <h2 className="payment-title">Płatność</h2>

            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Dziękujemy za zamówienie!</h3>
                        <p>Twoje zamówienie zostało pomyślnie złożone.</p>
                        <button onClick={handleModalClose}>Zamknij</button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="payment-form">
                <label>
                    Imię i nazwisko:
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                    E-mail:
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                    Ulica:
                    <input type="text" name="street" value={form.street} onChange={handleChange} required />
                </label>
                <label>
                    Miasto:
                    <input type="text" name="city" value={form.city} onChange={handleChange} required />
                </label>
                <label>
                    Kod pocztowy:
                    <input type="text" name="zip" value={form.zip} onChange={handleChange} required />
                </label>
                <label>
                    Metoda płatności:
                    <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                        <option value="card">Karta</option>
                        <option value="blik">BLIK</option>
                        <option value="cash">Przy odbiorze</option>
                    </select>
                </label>

                {form.paymentMethod === 'card' && (
                    <label>
                        Numer karty:
                        <input
                            type="text"
                            name="cardNumber"
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}

                {form.paymentMethod === 'blik' && (
                    <label>
                        Kod BLIK:
                        <input
                            type="text"
                            name="blikCode"
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}

                {error && <p className="payment-error">{error}</p>}
                <button type="submit" className="payment-button">Zamawiam</button>
            </form>
        </div>
    )
}