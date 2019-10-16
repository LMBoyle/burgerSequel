// Dependencies =============================================================

require('dotenv').config();
var express = require("express");
var exphbs = require("express-handlebars");
const handlebars = require('handlebars');
const repeat = require('handlebars-helper-repeat');

// Express ==================================================================

var app = express();
var PORT = process.env.PORT || 1745;

var db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars ===============================================================

var hbs = exphbs.create({
  defaultLayout: "main",
  helperRepeat: handlebars.registerHelper('repeat', repeat),
})

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Routes ===================================================================

app.use('/api', require('./routes/apiRoutes')(db));
app.use(require('./routes/htmlRoutes')(db));

// Listen ===================================================================
// console.log(db.sequelize)
db.sequelize.sync({ force: true }).then(function() {
  require('./db/seed.js')(db);
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});