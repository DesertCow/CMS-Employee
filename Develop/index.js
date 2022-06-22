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

  // TODO: Move choices into an array 

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'mainMenuChoice',
        choices: ['View (Departments/Roles/Employee(s)', 'Add (Department/Roles/Employee)', 'Update (Role/Promote)', 'Remove (Department/Roles/Employee)', 'Exit'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {


      switch (answers.mainMenuChoice) {
        case 'View (Departments/Roles/Employee(s)':
          viewMenu();
          break;
        case 'Add (Department/Roles/Employee)':
          addMenu();
          break;
        case 'Update (Role/Promote)':
          updateMenu();
          break;
        case 'Remove (Department/Roles/Employee)':
          removeMenu();
          break;
        case 'Exit':
          console.log(`\x1b[45m==================== Exit! ====================\x1b[0m`);
          console.log(`\x1b[45m=================== Goodbye! ==================\x1b[0m`);
          process.exit(1);
          break;
      }


    })


}

// ?============= viewMenu =============

async function viewMenu() {

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'viewMenuChoice',
        choices: ['View All Departments', 'View All Roles', 'View All Employee(s)', 'Main Menu'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {


      switch (answers.viewMenuChoice) {
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Employee(s)':
          viewEmployees();
          break;
        case 'Main Menu':
          mainMenu();
          break;
      }
    })
}

// ?============= addMenu =============

async function addMenu() {


  inquirer
    .prompt([
      {
        type: 'list',
        name: 'addMenuChoice',
        choices: ['Add A Department', 'Add A Role', 'Add An Employee', 'Main Menu'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {


      switch (answers.addMenuChoice) {
        case 'Add A Department':
          addDepartment();
          break;
        case 'Add A Role':
          addRole();
          break;
        case 'Add An Employee':
          addEmployee();
          break;
        case 'Main Menu':
          mainMenu();
          break;
      }


    })


}

// ?============= updateMenu =============

async function updateMenu() {

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'updateMenuChoice',
        choices: ['Update Employee Role', 'Main Menu'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {


      switch (answers.updateMenuChoice) {
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Main Menu':
          mainMenu();
          break;
      }


    })


}

// ?============= removeMenu =============

async function removeMenu() {

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'mainMenuChoice',
        choices: ['Remove Department', 'Remove Role', 'Remove Employee', 'Main Menu'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {


      switch (answers.mainMenuChoice) {
        case 'Remove Department':
          removeDepartment();
          break;
        case 'Remove Role':
          removeRole();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Main Menu':
          mainMenu();
          break;
      }


    })

}

// ?============= mainMenu =============

async function mainMenu2() {

  await 1

  // TODO: Move choices into an array 

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

  viewMenu();
};

// ?============= viewRoles =============
function viewRoles() {

  db.query('SELECT * FROM role', function (err, results) {
    console.log("\n\n\x1b[44m ================== Roles ==================\x1b[0m");
    console.table(results);
  });

  viewMenu();
};

// ?============= viewEmployees =============
function viewEmployees() {

  db.query('SELECT * FROM employee', function (err, results) {
    console.log("\n\n\x1b[44m ====== Employees ======\x1b[0m");
    console.table(results);
  });

  viewMenu();
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
          // console.log("\n\nCall API to create new department with the name " + newDepartmentName);
          let sqlCall = `INSERT INTO department (id, name)\nVALUES ("${answers.newID}", "${newDepartmentName}");`;
          console.log(sqlCall);

          db.query(sqlCall, function (err, results) {

            // console.log("\n\n\x1b[44m ====== Departments ======\x1b[0m");
            // console.table(results);
            // mainMenu();
          });

          addMenu();
        });
    })


};

// ?============= addRole =============
async function addRole() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newRole',
        message: "Please input the new role name",
      },
      {
        type: 'input',
        name: 'newRoleID',
        message: "Please input the new Role ID",
      },
      {
        type: 'input',
        name: 'newSalary',
        message: "Please input the roles salary",
      },
      {
        type: 'input',
        name: 'newDepartmentID',
        message: "Please input department ID",
        // TODO: Switch to list generated from exisiting departments 
      },
    ])
    .then(answers => {

      let newRoleTemp = answers.newRole;
      let newRoleIDTemp = answers.newRoleID;
      let newSalaryTemp = answers.newSalary;
      let newDepartmentIDTemp = answers.newDepartmentID;

      // console.log("\n\nCall API to create new department with the name " + newDepartmentName);
      let sqlCall = `INSERT INTO role (id, title, salary,department_id)\nVALUES ("${newRoleIDTemp}", "${newRoleTemp}", "${newSalaryTemp}", "${newDepartmentIDTemp}");`;
      console.log(sqlCall);

      db.query(sqlCall, function (err, results) {

      });

      // console.log("addRole");

      addMenu();
    });


};


// ?============= addEmployee =============
async function addEmployee() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newEmployeeID',
        message: "Please input the new Employee ID",
      },
      {
        type: 'input',
        name: 'newFirstName',
        message: "Please input First Name",
      },
      {
        type: 'input',
        name: 'newLastName',
        message: "Please input Last name",
      },
      {
        type: 'input',
        name: 'newRoleID',
        message: "Please Enter Employees Role ID",
        // TODO: Switch to list generated from exisiting Role ID's
      },
      {
        type: 'input',
        name: 'newManagerID',
        message: "Please input Manager ID",
        // TODO: Switch to list generated from exisiting managers/empl
      },
    ])
    .then(answers => {


      let sqlCall = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)\nVALUES ("${answers.newEmployeeID}", "${answers.newFirstName}", "${answers.newLastName}", "${answers.newRoleID}", "${answers.newManagerID}");`;
      console.log(sqlCall);

      db.query(sqlCall, function (err, results) {

      });

      // console.log("addRole");

      addMenu();

    })
};


// ?============= updateEmployeeRole =============
async function updateEmployeeRole(employeeID, newRole) {
  console.log("updateEmployeeRole");

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeID',
        message: "Please input the Employee ID",
      },
      {
        type: 'input',
        name: 'newRoleID',
        message: "Please input the NEW role ID",
      },
    ])
    .then(answers => {


      let sqlCall = `UPDATE employee\nSET role_id = ${answers.newRoleID}\nWHERE id = ${answers.employeeID}`;
      console.log(sqlCall);

      db.query(sqlCall, function (err, results) {

      });

      updateMenu();

    })

};


// ?============= removeDepartment =============
async function removeDepartment() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'removeDepartmentID',
        message: "Please input the ID of the department you want to remove",
      },
    ])
    .then(answers => {


      let sqlCall = `UPDATE employee\nSET role_id = ${answers.removeDepartmentID}\nWHERE id = ${answers.employeeID}`;
      console.log(sqlCall);

      // db.query(sqlCall, function (err, results) {

      // });

      removeMenu();

    })

}

// ?============= removeRole =============
async function removeRole() {

}

// ?============= removeEmployee =============
async function removeEmployee() {

}



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
  // console.log(`  ______                 _                                      `);
  // console.log(" |  ____|               | |                                     ");
  // console.log(" | |__   _ __ ___  _ __ | | ___  _   _  ___  ___                ");
  // console.log(' |  __| | '_` _  \| '_ \| |/ _ \| | | |/ _ \/ _ \               ');
  // console.log(" | |____| | | | | | |_) | | (_) | |_| |  __/  __/               ");
  // console.log(" |______|_| |_| |_| .__/|_|\___/ \__, |\___|\___|   ____   ___  ");
  // console.log(" |  \/  |         | |             __/ |     \ \    / /_ | / _ \ ");
  // console.log(" | \  / | __ _ _ _|_| __ _  __ _ |___/_ __   \ \  / / | || | | |");
  // console.log(" | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|   \ \/ /  | || | | | ");
  // console.log(" | |  | | (_| | | | | (_| | (_| |  __/ |       \  /   | || |_| |");
  // console.log(" |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|        \/    |_(_)___/ ");
  // console.log("                            __/ |                               ");
  // console.log("                           |___/                                ");
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