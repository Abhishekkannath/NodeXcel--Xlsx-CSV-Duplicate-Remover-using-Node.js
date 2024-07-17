const express = require("express");
const session = require("cookie-session");
const flash = require("connect-flash");

const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

// Set up session and flash middleware
app.use(
  session({
    secret: "alifarhadrules",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
