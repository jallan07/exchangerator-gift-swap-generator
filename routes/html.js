module.exports = (app) => {
  // render the homepage
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
};
