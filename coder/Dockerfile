FROM codercom/enterprise-node:ubuntu

USER coder

WORKDIR /home/coder
RUN git clone https://github.com/mmbarness/anima-works.git

WORKDIR /home/coder/anima-works
RUN npm install

#docker build -t mmbarness/animaworks_workspace -f coder.Dockerfile .