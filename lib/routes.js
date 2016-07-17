module.exports = function(app) {

  // Frontend
  app.use('/', require('./controllers/frontend'));

  // API
  app.use('/api', require('./controllers/services'));

  // Middleware
  app.use(require('./middleware/error-logger'));
  app.use(require('./middleware/error-handler'));

}
