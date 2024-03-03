FROM public.ecr.aws/docker/library/node:20.10-alpine

WORKDIR /code

ARG GIT_SSH_KEY

RUN apk update

RUN apk add openssh git

RUN mkdir /root/.ssh/

RUN echo "$GIT_SSH_KEY" | base64 -d > /root/.ssh/id_rsa

RUN chmod 400 ~/.ssh/id_rsa

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]