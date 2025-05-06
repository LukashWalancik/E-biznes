import Link from 'next/link';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <main>
      <div className="card-container">
        <div className="card">
          <h3>Lista dostępnych książek</h3>
          <p>Zobaczy książki dostępne w Książkarni.</p>
          <Link href="/books">Dostępne Książki</Link>
        </div>
      </div>
    </main>
  );
}