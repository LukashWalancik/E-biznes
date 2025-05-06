import Link from 'next/link';
import './ui/header.css';

export default function Header() {
    return (
        <header className="header">
            <Link href="/"><h1>Książkarnia</h1></Link>
        </header>
    );
}