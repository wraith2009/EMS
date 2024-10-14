FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate the Prisma client (if needed for your project)
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Run database migrations and then start the application
CMD npx prisma migrate deploy && npm run dev
