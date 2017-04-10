// Requiring express
var express = require("express");
// Requiring models burger and customer
var db = require("../models");
// Require moment
var moment = require("moment");
// Handlebar helper function to format date
var handlebarHelper = {
                         dateTimeFormat: function(dateTime) {
                                    return moment(dateTime).format("ll, LT");
                                  }
                      };

// setting router
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data,
      helpers: handlebarHelper
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  // if(req.body.name !== "" && !req.body.name.includes(";")) {
    db.Burger.create({
        burger_name: req.body.name
    }).then(function(result) {
      res.redirect('/');
    }).error(function(err) {
      console.log(err);
      // res.render("400");
    })
  // }else {
    
  // }
  
});
 
router.put("/devour", function(req, res) {
  db.Burger.update({
    devoured: 1
  },{
    where: {
      id: req.body.id
    }
  }).then(function(data) {
    res.redirect('/');
  })
});

// Export routes for server.js to use.
module.exports = router;
