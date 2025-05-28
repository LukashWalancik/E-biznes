// components/Header.jsx
import Link from 'next/link';
import './ui/header.css'; // Zakładam, że ten plik jest w folderze ui

export default function Header() {
    return (
        <header className="header">
            <Link href="/"><h1>Książkarnia</h1></Link>
            <nav>
                <ul className="nav-links">
                    <li><Link href="/books">Książki</Link></li>
                    <li><Link href="/cart">Koszyk</Link></li>
                    {/* Dodaj linki do rejestracji i logowania */}
                    <li><Link href="/register">Rejestracja</Link></li>
                    <li><Link href="/login">Logowanie</Link></li> {/* Ten link dodamy w kolejnym kroku */}
                </ul>
            </nav>
        </header>
    );
}