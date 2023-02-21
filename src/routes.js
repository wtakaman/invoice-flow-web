const routes = require('next-routes')();

routes.add('/merchants/new', '/merchants/new');
routes.add('/merchants/:address', '/merchants/show');
routes.add('/merchants/:address/invoices/new', '/merchants/invoices/new');
routes.add('/merchants/:address/invoices', '/merchants/invoices/index');

module.exports = routes;
