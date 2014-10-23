/**
 * server.js Created by Taro on 2014/10/21.
 */

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Stock = require('./app/models/stock');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.route('/stocks')
    .post(function (req, res) {
      var stock = new Stock();
      stock.name = req.body.name;

      //save to database
      stock.save(function (err) {
        if (err)
          res.send(err);

        res.json({message: 'Stock created!'});
      });
    })
    .get(function (req, res) {
      Stock.find(function (err, stocks) {
        if (err)
          res.send(err);

        res.json(stocks);
      })
    });

router.route('/stocks/:stock_id')
    .get(function (req, res) {
      Stock.findById(req.params.stock_id, function (err, stock) {
        if (err)
          res.send(err);
        res.json(stock);
      });
    })
    .put(function (req, res) {
      Stock.findById(req.params.stock_id, function (err, stock) {
        if (err)
          res.send(err);
        stock.name = req.body.name;

        stock.save(function (err) {
          if (err)
            res.send(err);

          res.json({message: 'Stock updated!'});
        });
      });
    })
    .delete(function (req, res) {
      Stock.remove({
        _id: req.params.stock_id
      }, function (err, stock) {
        if(err)
        res.send(err);

        res.json({message: 'Stock deleted!'})
      })
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
      app.use('/api', router);

      mongoose.connect('mongodb://localhost/node-api');

// START THE SERVER
// =============================================================================
      app.listen(port);
      console.log('Magic happens on port ' + port);