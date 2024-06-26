const next = require('next');
const { createServer } = require('http');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const routes = require('./routes');

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Ready on localhost: 3000');
  });
});
