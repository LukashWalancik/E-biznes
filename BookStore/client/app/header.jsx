// client/app/header.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import './ui/header.css';

export default function Header() {
    const { isAuthenticated, userName, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login?message=Zostałeś pomyślnie wylogowany.');
    };

    return (
        <header className="header">
            <Link href="/"><h1>Książkarnia</h1></Link>
            <nav>
                <ul className="nav-links">
                    <li><Link href="/books">Książki</Link></li>
                    <li><Link href="/cart">Koszyk</Link></li>
                    <li><Link href="/chat">Czat z Asystentem</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li className="welcome-message">Witaj, {userName.split(' ')[0]}!</li> 
                            <li><button onClick={handleLogout} className="logout-button">Wyloguj się</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/register">Rejestracja</Link></li>
                            <li><Link href="/login">Logowanie</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}