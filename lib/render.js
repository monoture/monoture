module.exports = function(req, res, next) {
  if (res.view) {
    if (req.originalUrl.endsWith('.json')) {
      res.json(res.view.data);
    } else {
      res.render(res.view.template, res.view.data);
    }
  } else {
    res.render('error');
  }
}
