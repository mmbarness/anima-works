FROM codercom/enterprise-base:ubuntu as coder

FROM node:17-alpine

COPY --from=coder . .

USER dev

WORKDIR /home/dev/anima-works

COPY . .

RUN yarn