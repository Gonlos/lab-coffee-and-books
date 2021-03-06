const express = require("express");
const router = express.Router();
const Place = require("../modules/place");
/* GET home page */
router.get("/", (req, res, next) => {
  Place.find()
    .then(places => {
      console.log(places)
      res.render("index", { places,placesStr:JSON.stringify(places) })
    })
    .catch(e => next(e));
});

router.get("/new", (req, res, next) => {
  res.render("new");
});
router.post("/new", (req, res, next) => {
  const { name, type, lat, lng } = req.body;
  if (!lat || !lng) {
    res.render("new", { e: "Es necesario indicar la ubicacion" })
    return
  }
  Place.create({ name, type, location:{type:'Point', coordinates:[lat, lng]} })
    .then(() => res.redirect("/"))
    .catch(e => res.render("new", { e }));
});
router.get("/coffee/:id", (req, res, next) => {
  Place.findById(req.params.id)
  .then(coffee => {
    Place.find({$and:[{type:"bookstore"},{location:{'$near':coffee.location}}]})
    .then(bookstores => {
      res.render("route", { places:[coffee,...bookstores],placesStr:JSON.stringify([coffee,...bookstores]) })
    })
  })
  
    .catch(e => next(e));
});

router.get("/coffee", (req, res, next) => {
  Place.find({type:"coffee"})
    .then(places => {
      console.log(places)
      res.render("index", { places,placesStr:JSON.stringify(places) })
    })
    .catch(e => next(e));
});


router.get("/bookstore/:id", (req, res, next) => {
  Place.findById(req.params.id)
  .then(bookstore => {
    Place.find({$and:[{type:"coffee"},{location:{'$near':bookstore.location}}]})
    .then(coffees => {
      res.render("index", { places:[bookstore,...coffees],placesStr:JSON.stringify([bookstore,...coffees]) })
    })
  })
  
    .catch(e => next(e));
});
router.get("/bookstore", (req, res, next) => {
  Place.find({type:"bookstore"})
    .then(places => {
      console.log(places)
      res.render("index", { places,placesStr:JSON.stringify(places) })
    })
    .catch(e => next(e));
});

module.exports = router;
