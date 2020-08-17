const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bacsCon = require("./src/Controllers/bacsCon");
const groupsCon = require("./src/Controllers/groupsCon");
const employeesCon = require("./src/Controllers/employeesCon");
const tasksCon = require("./src/Controllers/tasksCon");

const PORT = 1664;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("Welcome !"));
app.use("/bacs", bacsCon);
app.use("/groups", groupsCon);
app.use("/employees", employeesCon);
app.use("/tasks", tasksCon);

app.listen(PORT, () => {
  console.log("Server ready to rumble on Port: " + PORT);
});
