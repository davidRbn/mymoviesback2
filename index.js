const express = require("express");
const app = express();
const apiRouter = require("./apiRouter").router;
const mysql = require("mysql2");
const models = require("./models");
const cors = require("cors");
const { createPool } = require("mysql2");
const port = process.env.PORT || 8080;
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", apiRouter);
app.use(cors());

// app.use(function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*"),
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   })

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Hello world</h1>");
});

models.sequelize
  .sync()
  .then(
    app.listen(port, () => {
      console.log("Server is running", port);

      const connection = mysql.createConnection(process.env.JAWSDB_URL);
      // const connection = mysql.createConnection({
      //   host: process.env.DB_Host,
      //   port: process.env.DB_Port,
      //   user: process.env.DB_User,
      //   password: process.env.DB_Pass,
      //   database: process.env.DB_Data,
      //   waitForConnections: true,
      //   connectionLimit: 10,
      //   queueLimit: 0,
      // });

      connection.connect(function (err) {
        if (err) {
          console.error("Error connecting to the database:", err);
          return;
        }

        console.log("Connected to the database");
      });

      connection.query(
        "SELECT 1 + 1 AS solution",
        function (err, rows, fields) {
          if (err) throw err;

          console.log("The solution is: ", rows[0].solution);
        }
      );
    })
  )

  .catch((error) => {
    console.error("Error synchronizing Sequelize models:", error);
  });
