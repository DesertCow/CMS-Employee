//
// Clayton Skaggs 6-22-22
//
// - npm install inquirer
// - npm install jest


//? Import Modules
// const fs = require('fs');
var inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname + '/config/config.env') })

console.log("\x1b[45mEnviroment File:\x1b[0m" + path.resolve(__dirname + '/config/config.env'))



//!===================== Connect to DB =====================
//console.log(process.env.dbNAME + "||" + process.env.PASSWORD + "||" + process.env.HOST + "||" + process.env.HOSTPORT + "||" + process.env.DB_USER);

const db = mysql.createConnection(
  {
    host: process.env.HOST,
    port: process.env.HOSTPORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.dbNAME
  },
  console.log(`Connected to the \x1b[43m${process.env.dbNAME}\x1b[0m database at \x1b[42m${process.env.HOST}:${process.env.HOSTPORT}\x1b[0m`)
);



//!===================== Variable Decleration =====================




//!=========================== Functions ==========================

// ?============= mainMenu =============

async function mainMenu() {

  await 1

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'mainMenuChoice',
        choices: ['View All Departments', 'View All Roles', 'View All Employee(s)', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee Role', 'Exit'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {


      switch (answers.mainMenuChoice) {
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Employee(s)':
          viewEmployees();
          break;
        case 'Add A Department':
          addDepartment();
          break;
        case 'Add A Role':
          addRole();
          break;
        case 'Add An Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log(`\x1b[45m==================== Exit! ====================\x1b[0m`);
          console.log(`\x1b[45m=================== Goodbye! ==================\x1b[0m`);
          process.exit(1);
          break;
      }


    })


}


// ?============= viewDepartments =============
function viewDepartments() {


  db.query('SELECT * FROM department', function (err, results) {
    console.log("\n\n\x1b[44m ====== Departments ======\x1b[0m");
    console.table(results);
  });

  mainMenu();
};

// ?============= viewRoles =============
function viewRoles() {

  db.query('SELECT * FROM role', function (err, results) {
    console.log("\n\n\x1b[44m ================== Roles ==================\x1b[0m");
    console.table(results);
  });

  mainMenu();
};

// ?============= viewEmployees =============
function viewEmployees() {

  db.query('SELECT * FROM employee', function (err, results) {
    console.log("\n\n\x1b[44m ====== Employees ======\x1b[0m");
    console.table(results);
  });

  mainMenu();
};

// ?============= addDepartment =============
async function addDepartment() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: "Please input the new department name",
      },
    ])
    .then(answers => {

      let newDepartmentName = answers.newDepartment;

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'newID',
            message: "Please input the new department ID",
          },
        ])
        .then(answers => {
          console.log("\n\nCall API to create new department with the name " + newDepartmentName);

          db.query(`INSERT INTO department (id, name)VALUES ("${answers.ID}", "${newDepartmentName}"),`, function (err, results) {

            console.log("\n\n\x1b[44m ====== Employees ======\x1b[0m");
            console.table(results);
            mainMenu();
          });
        });
    })



  console.log("addDepartment");

  mainMenu();
};

// ?============= addRole =============
function addRole() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newRole',
        message: "Please input the new role name",
      },
    ])
    .then(answers => {

      console.log("\n\nCall API to create new role with the name " + answers.newRole);

    })
  console.log("addRole");

  mainMenu();
};


// ?============= addEmployee =============
function addEmployee() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newEmployee',
        message: "Please input the new Employee name",
      },
    ])
    .then(answers => {

      console.log("\n\nCall API to create new Employee with the name " + answers.newEmployee);

    })

  console.log("addEmployee");

  mainMenu();
};


// ?============= updateEmployeeRole =============
function updateEmployeeRole() {
  console.log("updateEmployeeRole");
  mainMenu();
};


// ?============= addTeamMember =============

// ?============= Init =============

function init() {

}

function welcome() {

  console.log(" _______  __   __  _______  ___      _______  __   __  _______  _______   ");
  console.log("|       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |  ");
  console.log("|    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|  ");
  console.log("|   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___   ");
  console.log("|    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|  ");
  console.log("|   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___   ");
  console.log("|_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|  ");
  console.log(" __   __  _______  __    _  _______  _______  _______  ______             ");
  console.log("|  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |            ");
  console.log("|       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||            ");
  console.log("|       ||       ||       ||       ||   | __ |   |___ |   |_||_           ");
  console.log("|       ||       ||  _    ||       ||   ||  ||    ___||    __  |          ");
  console.log("| ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |          ");
  console.log("|_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|          ");
  console.log("\n\n")


};


//!===================== Init ~ Main =====================

//*============== Init ==============
init();

//*============== Main ==============

welcome();
mainMenu();

//*=========== END of MAIN ==========

//!========================= EOF =========================