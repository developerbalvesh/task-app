const express = require("express");
const dotenv = require("dotenv");
const monran = require("morgan");
const connectDB = require("./config/db.js");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes.js");
const taskRoutes = require("./routes/taskRoute.js");
const cors = require('cors');

const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = "path";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = dirname(__filename);


// config dotenv
dotenv.config();
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './frontend/dist')))



// route for authentication
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);

// post request

app.use("*",function(req, res){
    res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})
// app.get("/", (req, res) => {
//   res.send({
//     message: "got a get request",
//   });
// });

app.listen(process.env.PORT, () => {
  console.log("server is now running");
});
