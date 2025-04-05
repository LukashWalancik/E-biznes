FROM ubuntu:latest

# Podpunkt 1 na podstawie: https://www.build-python-from-source.com/
RUN apt update
RUN apt -y install wget make zlib1g zlib1g-dev gcc

WORKDIR /tmp
RUN wget https://www.python.org/ftp/python/3.10.16/Python-3.10.16.tgz
RUN tar xzf Python-3.10.16.tgz

WORKDIR /tmp/Python-3.10.16
RUN ./configure
RUN make
RUN make install

WORKDIR /tmp
RUN rm -r Python*

WORKDIR /


# Podpunkt 2
RUN apt update
RUN apt install -y openjdk-8-jdk wget unzip

WORKDIR /opt
RUN wget https://github.com/JetBrains/kotlin/releases/download/v2.1.20/kotlin-compiler-2.1.20.zip
RUN unzip kotlin-compiler-2.1.20.zip
RUN rm -f kotlin-compiler-2.1.20.zip

ENV PATH="$PATH:/opt/kotlinc/bin"
WORKDIR /

# Podpunkt 3
WORKDIR  /opt
RUN wget https://services.gradle.org/distributions/gradle-8.13-bin.zip
RUN unzip gradle-8.13-bin.zip
RUN rm -f gradle-8.13-bin.zip

ENV PATH="$PATH:/opt/gradle-8.13/bin"
WORKDIR /

WORKDIR /app
RUN mkdir Gradle
COPY Gradle /app/Gradle
WORKDIR /app/Gradle
RUN gradle build

# Podpunkt 4?
CMD ["gradle", "run"]