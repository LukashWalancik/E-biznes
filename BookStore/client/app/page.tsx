import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div className="card-container">
        <div className="card">
          <h3>Lista dostępnych książek</h3>
          <p>Zobacz książki dostępne w Książkarni.</p>
          <Link href="/books">Dostępne Książki</Link>
        </div>
      </div>
    </main>
  );
}