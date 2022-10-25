const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require("cors");
const pool = require("./db/index");
const path = require("path")


//PASSPORT MIDDLEWARE
require('./middlewares/passport-middleware');

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}

//IMPORT ROUTES
const clientRoutes = require('./routes/client');
const franchiseRoutes = require('./routes/franchise');
const structureRoutes = require('./routes/structure');
const emailRoutes = require('./routes/email')

//INITIALIZE ROUTES
app.use('/api', clientRoutes);
app.use('/api', franchiseRoutes);
app.use('/api', structureRoutes);
app.use('/api', emailRoutes);


app.listen(8000, () => {
    console.log(`Server running successfully in port ${PORT}`)
});