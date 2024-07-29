const { name } = require("ejs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use('/assets', express.static(__dirname + '/assets'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

// DataBase
var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ahmadmo.83",  // or Ahmad.83
  database: "inventory",
  multipleStatements: true
});

// con.connect(function(err) {
//   if (err) throw err
//   console.log("Connected!");
//   var sql = "CREATE DATABASE inventory";
//   var sql1 = "CREATE TABLE commodity (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150) NOT NULL, code INT, cat VARCHAR(200) NOT NULL, description VARCHAR(255))";
//   var sql2 = "CREATE TABLE category (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200) NOT NULL)";
//   var sql3 = "INSERT INTO commodity (name, code, cat, description) VALUE ('retlo',44455,'defr', ' zohair va ahmadi kheyli kharand ')";
//   con.query(sql2, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

app.get('/', (req, res)=>{
    res.render("logic");
});

app.get('/preview', (req, res)=>{
  con.connect(function(err) {
    if (err) throw err
    console.log("Connected!");
    con.query('SELECT * FROM commodity; SELECT * FROM category', function (err, results) {
      if (err) throw err;
      res.render("preview", {couloms: results[0], categorys: results[1]});
    });
  });
});

app.get('/login', (req, res)=>{
  res.render("login");
});

app.get('/inven', (req, res)=>{
  con.connect(function(err) {
    if (err) throw err
    console.log("Connected!");
    con.query('SELECT * FROM commodity; SELECT * FROM category', function (err, results) {
      if (err) throw err;
      res.render("inventory", {couloms: results[0], categorys: results[1]});
    });
  });
});

app.post('/inven', (req, res)=>{
  con.connect(function(err) {
    if (err) throw err
    var query1 = `INSERT INTO commodity (name, code, cat, description) VALUE ('${req.body.name}', ${req.body.code}, '${req.body.cat}', '${req.body.description}')`;
    var query2 = `INSERT INTO category (name) VALUE ('${req.body.name}')`;
    var query3 = `DELETE FROM commodity WHERE id='${req.query.id}'`;
    var sql = (req.query.from == "add") ? query1 : (req.query.from == "addCat") ? query2 : (req.query.from == "del") ? query3 : ""; 
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
  res.redirect('/inven');
});

app.listen(3000, ()=>{
    console.log("server is live in port 3000");
});