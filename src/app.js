const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const employeeRoute = require("./Routers/employeeRoute");
require("./DBConnections/conn");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(employeeRoute);
app.get("/upload/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "./uploads/" + req.params.file));
});
app.listen(port, () => {
  console.log(`connection is successfull at port ${port}`);
});
