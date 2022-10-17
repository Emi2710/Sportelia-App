const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require("cors");
const pool = require("./db/index");


//PASSPORT MIDDLEWARE
require('./middlewares/passport-middleware');

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//IMPORT ROUTES
const clientRoutes = require('./routes/client');
const franchiseRoutes = require('./routes/franchise');

//INITIALIZE ROUTES
app.use('/api', clientRoutes);
app.use('/api', franchiseRoutes);


app.listen(8000, () => {
    console.log("Server running successfully in port 8000")
});