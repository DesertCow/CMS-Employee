//
//
// npm i uuid
//

//! ================= Import Section =================



const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//! ================= DB Connection =================

const PORT = process.env.PORT || 3001;
const HOST = '192.168.25.10';
const HOSTPORT = 3306;
const DATABASENAME = 'CMSEmployee';

// Connect to remote mySQL instance
const db = mysql.createConnection(
  {
    host: HOST,
    port: HOSTPORT,
    user: 'root',
    password: 'm!m2022Tiger',
    database: DATABASENAME,
  },
  console.log(`\n` + `Connected to the \x1b[42m${DATABASENAME}\x1b[0m database hosted on \x1b[47m` + HOST + ":" + HOSTPORT + `\x1b[0m\n`)
);

//! ======================= Routing =====================




//! ================= Functions =================

function DBTest() {

  console.table([
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]);

};

function getAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.log("====== All Departments =======");
    console.log(results);
  });
}

function getAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.log("======== All Roles =========");
    console.log(results);
  });
}


function getAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.log("====== All Employees =======");
    console.log(results);
  });
}


function init() {


}


//! ================= Main  =================


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

getAllDepartments();
getAllRoles();
getAllEmployees();

//! ================= EOF  =================
