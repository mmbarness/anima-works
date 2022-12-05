FROM codercom/enterprise-node:ubuntu

USER root

RUN mkdir -p /home/dev/anima-works

WORKDIR /home/dev/anima-works

COPY . .

RUN npm install

#docker build -t mmbarness/animaworks_workspace -f coder.Dockerfile .