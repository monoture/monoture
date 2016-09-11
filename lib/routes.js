module.exports = function(app) {

  // Frontend
  app.use('/', require('./controllers/frontend'));

  // API
  app.use('/api', require('./controllers/services'));

  // Dashboard
  app.get('/dashboard', function(req, res, next){
    res.render('dashboard', {
      plugins : require('./plugins')
    });
  });

  // Middleware
  app.use(require('./middleware/error-logger'));
  app.use(require('./middleware/error-handler'));

}
