var express = require("express");


var routes = express.Router(); 







// ignore below =============================================================================================================================


// app.get("/", (req, res) => {
//     res.render("index", {
//         burgers: burgers
//     });
// })

// app.get("/api/burgers", (req, res) => {
//     //my SQL retrieves burgers array from DB
//     res.json(burgers);
// });

// app.put("/api/burgers/:id", (req,res) => {
//     const chosen = req.params.id;
// })


// app.post("/api/burgers", (req, res) => {
//     let newBurger = req.body;
// })


// app.put("/update", (req, res) => {
//     connection.query("UPDATE burgers SET burger_name = ? WHERE id =?", [req.body.burger, req.params.id], function(err, result) {
//         if(err)
//         return console.log(err);

//         res.status(200).end();
//     })
// })


// app.delete("/delete", (req, res) => {
//     connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
//         if (err) return console.log(err);

//         res.status(200).end();
//     })
// })


module.exports = routes;