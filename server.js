var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();
// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// var routes = require("./controllers/burgers_controller.js")

// app.use(routes);





var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "shed120",
    database: "burger_db"
});


connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});



// Routes = Controller =================================================================


// Use Handlebars to render the main index.html page with the list of all the burgers
app.get("/", (req, res) => {

    connection.query("SELECT * FROM burgers;", function (err, data) {
        if (err) {
            throw err;
        }
        // Test:
        console.log('The burgers are: ', data);
        res.render("index", { burgers: data });
    })

});

// app.get("/api/burgers", (req, res) => {
//     //my SQL retrieves burgers array from DB
//     res.json(burgers);
// });


// app.put("/api/burgers/:id", (req, res) => {
//     const chosen = req.params.id;
// })


//Add it to the devoured list
app.post("/api/burgers", (req, res) => {
    // Test it.
    console.log('You sent ' + req.body.newBurger);

    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.newBurger], function (err, result) {
        if (err) {
            throw err;
        }
        res.redirect("/");
    });
})


// ==========================================================================
//Remove burger from "undevoured" list and move it to the devoured list:
// ==========================================================================

//Remove from undevoured list
// app.delete("/devour/:id", (req, res) => {
//     connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function (err, result) {
//         console.log(req.params.id)

//         if (err) return console.log(err);

//         res.status(200).end();
//     })
// });


// Update the burger
app.put("/devour/:id", function(req, res) {
    connection.query("UPDATE burgers SET devoured = ? WHERE id = ?", [true, req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });







// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});