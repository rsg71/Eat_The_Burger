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






var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "shed120",
  database: "burger_db"
});


connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });




const burgers = [
    {
        id: 1, 
        name: "Bacon Burger",
        devoured: false
    },
    {
        id: 2, 
        name: "Cheese Burger",
        devoured: false
    },
    {
        id: 3, 
        name: "Turkey Burger",
        devoured: false
    }
]

// Routes = Controller =================================================================
app.get("/", (req, res) => {
    res.render("index", {
        burgers: burgers
    });
})

app.get("/api/burgers", (req, res) => {
    //my SQL retrieves burgers array from DB
    res.json(burgers);
});

app.put("/api/burgers/:id", (req,res) => {
    const chosen = req.params.id;
})


app.post("/api/burgers", (req, res) => {
    let newBurger = req.body;
})


app.put("/update", (req, res) => {
    connection.query("UPDATE burgers SET burger_name = ? WHERE id =?", [req.body.burger, req.params.id], function(err, result) {
        if(err)
        return console.log(err);

        res.status(200).end();
    })
})


app.delete("/delete", (req, res) => {
    connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
        if (err) return console.log(err);

        res.status(200).end();
    })
})


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
  