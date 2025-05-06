FROM golang:1.24

RUN apt-get update && apt-get install -y gcc libc6-dev

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

ENV CGO_ENABLED=1

RUN go build -o main .

EXPOSE 1323

CMD ["./main"]
