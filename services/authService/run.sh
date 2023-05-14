#!/bin/bash

set -e
set -v

yarn init -y

mkdir src/
mkdir -p src/app/
mkdir -p src/app/adapters/
mkdir -p src/app/adapters/database/
mkdir -p src/app/adapters/database/mongoose/
mkdir -p src/app/errors/
mkdir -p src/app/interfaces/
mkdir -p src/app/utils/
mkdir -p src/app/usecases/
mkdir -p src/infrastructure/
mkdir -p src/infrastructure/database/
mkdir -p src/infrastructure/database/mongodb/
mkdir -p src/infrastructure/database/mongodb/migrations/
mkdir -p src/presentation/
mkdir -p src/presentation/api/
mkdir -p src/presentation/api/controllers/
mkdir -p src/presentation/routes/

touch src/main.ts

touch tsconfig.json

echo '{
"compilerOptions": {
"module": "NodeNext",
"target": "es2020",
"outDir": "build",
"sourceMap": true,
"allowJs": true,
"noEmit": true,
"allowImportingTsExtensions": true,
"moduleResolution": "nodenext",
"noImplicitAny": true,
"strict": false,
"esModuleInterop": true,
"skipLibCheck": true
},
"include": ["src/**/*"]
}' > tsconfig.json

touch Dockerfile

echo '
FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "dev" ]
' > Dockerfile

touch .env

yarn add amqplib body-parser cookie-parser cors crypto dotenv express joi jsonwebtoken mongoose morgan

yarn add -D @types/amqplib @types/cookie-parser @types/cors @types/dotenv @types/express @types/joi @types/jsonwebtoken @types/morgan  @types/node nodemon ts-node typescript
