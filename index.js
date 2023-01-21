const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500
require('dotenv').config()
const connect = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")
var cors = require('cors')

const corsOptions = {
    origin: "*",
    method: ["GET", "POST"]
}

app.use(cors(corsOptions))

connect();

app.use(express.json())

app.use("/", authRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
    console.log("Home")
})

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
})