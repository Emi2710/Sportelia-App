const express = require("express");
const app = express();
const cors = require("cors");

//MIDDLEWARES
app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log("Server running successfully in port 8000")
});