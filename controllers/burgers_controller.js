// Requiring express
var express = require("express");
// Requiring models burger and customer
var db = require("../models");

// Handlebar helper function moved to server.js for global use

// setting router
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  var fetchDataArray = [];
  var customerData = {};
  var burgerData = {};
  var customerDataArray = [];
  var burgerDataArray = [];

  fetchDataArray.push( db.Customer.findAll({
                          // order: "'customer_name'"
                       })
  );
  fetchDataArray.push( db.Burger.findAll({
                          order: "'burger_name' DESC"
                       })
  );

  Promise.all(fetchDataArray).then(function(responseData) {
      responseData.forEach(function(dataItem) {
        // console.log("Data item");
        dataItem.forEach(function(item) {
          // console.log("Each Item");
          // console.log(item);
          if(item.customer_name) {
            // console.log(item.customer_name);
            customerData = {
                id: item.id,
                customerName: item.customer_name
            }
            customerDataArray.push(customerData);
          }else {
            var customerName = "";
            // console.log("customer Id from burgers table");
            // console.log(item.CustomerId);
            // Looping through each customerData object to find customer names 
            customerDataArray.forEach(function(objectItem) {
              // console.log("customer Id from customerData object");
              // console.log(objectItem.id);
                if(item.CustomerId === objectItem.id) {
                  // console.log("customer name from customerData objct");
                  // console.log(objectItem.customerName);
                   customerName = objectItem.customerName;
                   // console.log(customerName);
                }
            })
            burgerData = {
                burger_name: item.burger_name,
                devoured: item.devoured,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                customerName: customerName
            }
            burgerDataArray.push(burgerData);
          }
          
        });
      });
      // console.log(customerDataArray);
      var homepageModel = {
        burgers: burgerDataArray,
        customers: customerDataArray
      };
      // console.log(homepageModel);
      res.render("index", homepageModel);
  });
});

router.post("/add/burger", function(req, res) {
    console.log(req.body.name);
    db.Burger.create({
      burger_name: req.body.name,
      CustomerId: req.body.custId
    }).then(function(result) {
      res.redirect('/');
    }).catch(function(err) {
      var errorMessage = "";
      console.log(err.message);
      // if(req.body.name !== null) {
        if(req.body.name.match(/[^a-zA-Z\d\s:]/)) {
          console.log(err.message);
            errorMessage = err.message.replace("Validation not failed", "") + "Invalid character. Possible SQL injection detected.";
            console.log(errorMessage);
        }
      // }
      res.render("400", {error: errorMessage});
    })
  
});
 
router.put("/devour", function(req, res) {
  // var cutomerName = req.body.name;
  var customerId = req.body.id;
  db.Burger.update({
    devoured: 1
  },{
    where: {
      id: req.body.id
    }
  }).then(function(data) {
    /////// How to send data to post request from here ////////
    res.redirect('/');
  })
});

router.post("/add/customer", function(req,res) {
  db.Customer.create({
    customer_name: req.body.name
  }).then(function(response) {
    res.redirect("/");
  }).catch(function(error) {
    var errorMessage = "";
    if(req.body.name.match(/[^a-zA-Z\d\s:]/)) {
      console.log(error.message);
        errorMessage = error.message.replace("Validation not failed", "") + "Invalid character. Possible SQL injection detected.";
        console.log(errorMessage);
    }
    res.render("400", {error: errorMessage});
  })
});

router.post("/customer/:id", function(req,res) {
  // console.log(req.body.id);
  db.Burger.findAll({
    where: {
      CustomerId: req.params.id
    }
  }).then(function(burgerData) {
    console.log(burgerData);
    var customerPageModel = {
      customerId: req.params.id,
      customerName: req.body.name,
      burgers: burgerData
    }
    res.render("customer", customerPageModel);
  });
})

// Export routes for server.js to use.
module.exports = router;
