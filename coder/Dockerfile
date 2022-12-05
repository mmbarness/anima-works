FROM codercom/enterprise-node:ubuntu

USER root

# Copy source into container
RUN mkdir -p /home/coder/anima-works
WORKDIR /home/coder/anima-works
COPY . .

RUN npm install

#docker build -t mmbarness/animaworks_workspace -f coder.Dockerfile .