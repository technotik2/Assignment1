var express = require('express');
var router = express.Router();

/* GET home page. */

/* GET home page. */
router.get('/home', function (req, res) {
  res.render('Home', { title: 'Home' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('About_me', { title: 'About' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});
/* GET Products page. */
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
  
});
/* GET Contact page. */
router.get('/contact', function(req, res) {
  res.render('Contact', { title: 'Contact' });
  
});




module.exports = router;
