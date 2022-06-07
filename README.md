# Welcome to LSB-Web

This repo aims to provide a modern web interface to the LandSandBoat emulation software.

## Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

### Prisma

This project uses Prisma as an ORM. Make sure to copy the `.env.default` to `.env` and update the Database URL.
If the schema in `prisma/schema.prisma` is out of date, delete it and run `npx prisma db pull`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying applications you should be right at home just make sure to deploy the output of `remix build`

-   `build/`
-   `public/build/`
