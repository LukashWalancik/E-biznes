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

CMD /bin/bash