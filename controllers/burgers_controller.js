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
  db.Burger.findAll({
    order: "'burger_name' DESC"
  }).then(function(data) {
    var hbsObject = {
      burgers: data,
      helpers: handlebarHelper
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
    console.log(req.body.name);
    var pattern = /not/i;
    if(req.body.name === "") {
      req.body.name = null;
    }
    db.Burger.create({
      burger_name: req.body.name
    }).then(function(result) {
      res.redirect('/');
    }).catch(function(err) {
      var errorMessage = "";
      // console.log(err.message);
      if(req.body.name !== null) {
        if(req.body.name.match(/[^a-zA-Z\d\s:]/)) {
          console.log(err.message);
            errorMessage = err.message.replace("Validation not failed", "") + "Invalid character. Possible SQL injection detected.";
            console.log(errorMessage);
        }
      }else {
        err.message.replace("is", "'is'");
        errorMessage = err.message;
      }
      res.render("400", {error: errorMessage});
    })
  
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
