'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import './payment.css'

export default function PaymentPage() {
    const { cart, clearCart } = useCart()
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
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
                const response = await axios.post('http://localhost:1323/payment', {
                    form,
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
                clearCart()
                setShowSuccessModal(true)
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
                            // value={form.cardNumber || ''}
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
                            // value={form.blikCode || ''}
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

