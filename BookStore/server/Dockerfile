FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN GOOS=linux go build -o main ./server.go

FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/main .

RUN apt update && apt install -y --no-install-recommends \
    sqlite3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 1323

CMD ["./main"]