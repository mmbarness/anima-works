FROM codercom/enterprise-node:ubuntu

USER root

# Copy source into container
WORKDIR /usr/src/anima-works
COPY . .

RUN npm install

#docker build -t mmbarness/animaworks_workspace -f coder.Dockerfile .