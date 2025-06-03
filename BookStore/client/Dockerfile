# Etap 1: Budowanie aplikacji Next.js
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --frozen-lockfile 

COPY . .

# Budujemy aplikację Next.js w trybie standalone
# Upewnij się, że next.config.js ma `output: 'standalone'`
RUN npm run build

# Etap 2: Serwowanie aplikacji produkcyjnej za pomocą Node.js
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Kopiujemy WSZYSTKIE pliki z /app/.next/standalone do katalogu roboczego /app.
# Ten katalog zawiera server.js, zoptymalizowane node_modules,
# oraz wewnętrzny katalog ./.next/static z zasobami produkcyjnymi.
COPY --from=builder /app/.next/standalone ./

# Kopiujemy katalog public do /app/public
# Next.js standalone nie kopiuje katalogu public, więc jest on wymagany osobno.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./_next/static
# Komenda uruchamiająca aplikację Next.js
# server.js jest teraz w katalogu głównym /app
CMD ["node", "./server.js"]