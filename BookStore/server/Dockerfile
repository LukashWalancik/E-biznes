# Etap budowania: Używamy pełnego obrazu Go bazującego na Debianie 12 (Bookworm)
FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

# Budujemy aplikację Go z CGo włączonym
RUN GOOS=linux go build -o main ./server.go

# Etap końcowy: Używamy minimalnego obrazu Debiana 12 (Bookworm) do uruchomienia aplikacji
FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/main .

# Dodajemy biblioteki SQLite3 i certyfikaty do środowiska uruchomieniowego
# Pamiętaj, że w Debianie Bookworm możesz użyć 'apt' zamiast 'apt-get'
RUN apt update && apt install -y --no-install-recommends \
    sqlite3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 1323

CMD ["./main"]