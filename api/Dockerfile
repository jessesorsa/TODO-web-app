FROM denoland/deno:alpine-1.37.0

WORKDIR /app

COPY deps.js .

RUN deno cache deps.js

COPY . .

EXPOSE 8000

CMD [ "run", "--allow-net", "--allow-read", "--allow-env", "--unstable", "--watch", "app-run.js" ]