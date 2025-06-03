/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <--- Dodajemy lub upewniamy się, że to jest ustawione
  // Jeśli Twoja aplikacja wywołuje API na localhost:1323, będziesz musiał ustawić zmienną środowiskową
  // NEXT_PUBLIC_BACKEND_URL lub podobną w kontenerze,
  // lub użyć proxy w Next.js dev serverze.
  // Dla produkcji, 'http://localhost:1323' musi zostać zmienione na publiczny URL backendu.
  // Na razie to zostawimy, ale pamiętaj o tym na etapie deploymentu.
  // Ten fragment kodu nie wpływa na błąd standalone, ale jest ważny dla działania aplikacji.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:1323/:path*', // Zmień na URL Twojego backendu w prod.
      },
    ];
  },
};

module.exports = nextConfig;