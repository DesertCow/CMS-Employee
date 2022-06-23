//
// Clayton Skaggs 6-22-22
//
// - npm i inquirer@8.2.4
// - npm i mysql2
// - npm i express
// - npm i dotenv
// - npm i console.table


//!===================== Variable Decleration / Import =====================

var inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname + '/config/config.env') })

// console.log("\x1b[45mEnviroment File:\x1b[0m" + path.resolve(__dirname + '/config/config.env'))

//!===================== Connect to DB =====================


const db = mysql.createConnection(
  {
    host: process.env.HOST,
    port: process.env.HOSTPORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.dbNAME
  },
  console.log("\n============================================================"),
  console.log(`Connected to the \x1b[42m${process.env.dbNAME}\x1b[0m database at \x1b[44m${process.env.HOST}:${process.env.HOSTPORT}\x1b[0m|`),
  console.log("============================================================\n\n")
);


//!=========================== Menu Functions ==========================

// ?============= mainMenu =============

async function mainMenu() {

  await 1

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'mainMenuChoice',
        choices: ['View (Departments/Roles/Employee(s)', 'Add (Department/Roles/Employee)', 'Update (Role/Promote)', 'Remove (Department/Roles/Employee)', '\x1b[41mExit\x1b[0m'],
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
        case '\x1b[41mExit\x1b[0m':
          console.log(`\x1b[41m==================== Exit! ====================\x1b[0m`);
          process.exit(1);
          break;
      }
    })
}

// ?============= View Sub Menu =============

async function viewMenu() {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'viewMenuChoice',
        choices: ['View All Departments', 'View All Roles', 'View All Employee(s)', 'View All Employee(s) by Department', 'View Total Budget By Department', 'Main Menu'],
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
        case 'View Total Budget By Department':
          departmentBudget();
          break;
        case 'View All Employee(s) by Department':
          viewEmployeesByDepartment();
          break;
        case 'Main Menu':
          mainMenu();
          break;
      }
    })
}

// ?============= Add Sub Menu =============

async function addMenu() {
  console.log("\n");
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

// ?============= Update Sub Menu =============

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

// ?============= Remove Sub Menu =============

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

//!=========================== Functions ==========================
// ?============= viewDepartments =============
function viewDepartments() {


  db.query('SELECT * FROM department', function (err, results) {
    console.log("\n\n\x1b[45m ====== Departments ===== \x1b[0m");
    console.table(results);
  });

  viewMenu();
};

// ?============= viewRoles =============
function viewRoles() {
  db.query('SELECT role.title, role.id, department.name, role.salary\nFROM department\nINNER JOIN role ON department.id = role.department_id;', function (err, results) {
    console.log("\n\n\x1b[42m ================== Roles ================== \x1b[0m");
    console.table(results);
  });

  viewMenu();
};

// ?============= viewEmployees =============
function viewEmployees() {

  db.query('SELECT * FROM employee', function (err, results) {
    console.log("\n\n\x1b[43m ============================================== Employees ============================================= \x1b[0m");
    console.table(results);
  });

  viewMenu();
};

// ?============= viewEmployeesByDepartment =============
function viewEmployeesByDepartment() {

  db.query('SELECT *\nFROM role\nJOIN department ON (department.id = role.department_id)\nJOIN employee ON (employee.role_id = department.id)', function (err, results) {
    console.log("\n\n\x1b[43m ============================================== Employees ============================================= \x1b[0m");
    console.table(results);
  });

  viewMenu();
};

// ?============= departmentBudget =============
async function departmentBudget() {
  console.log("\n");
  let sqlCall = `SELECT SUM(salary) AS 'Department Total', title\nFROM role\nGROUP BY title`;
  // console.log(sqlCall)
  db.query(sqlCall, function (err, results) {
    console.log("\n\n\x1b[45m ====== Departments Budget ====== \x1b[0m");
    console.table(results);
    viewMenu();
  })
}

// ?============= addDepartment =============
async function addDepartment() {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: "Please input the new department name",
      },
    ])
    .then(answers => {
      let sqlCall = `INSERT INTO department (name)\nVALUES ("${answers.newDepartment}");`;
      // console.log(sqlCall);

      db.query(sqlCall, function (err, results) {
        addMenu();
      });
    });
};

// ?============= addRole =============
async function addRole() {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newRole',
        message: "Please input the new role name",
      },
      {
        type: 'input',
        name: 'newSalary',
        message: "Please input the roles salary",
      },
    ])
    .then(answers => {

      let newRoleTemp = answers.newRole;
      let newSalaryTemp = answers.newSalary;

      db.query('SELECT * FROM department', function (err, results) {

        console.log("\n\n\x1b[44m ====== Departments ======\x1b[0m");
        console.table(results);
      })

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'newDepartmentID',
            message: "Please input department ID",
          },
        ])
        .then(answers => {

          let sqlCall = `INSERT INTO role (title, salary,department_id)\nVALUES ("${newRoleTemp}", "${newSalaryTemp}", "${answers.newDepartmentID}");`;
          // console.log(sqlCall);

          db.query(sqlCall, function (err, results) {

            addMenu();

          });
        });
    });
};


// ?============= addEmployee =============
async function addEmployee() {
  console.log("\n");
  let tempFirstName = '';
  let tempLastName = '';
  let tempManagerID = '';

  inquirer
    .prompt([
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
    ])
    .then(answers => {

      tempFirstName = answers.newFirstName;
      tempLastName = answers.newLastName;

      db.query('SELECT * FROM employee', function (err, results) {

        console.log("\n\n\x1b[44m ================= Employee =================\x1b[0m");
        console.table(results);
      });
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'newManagerID',
            message: "Please input Manager ID",
          },
        ])
        .then(answers => {

          tempManagerID = answers.newManagerID;

          db.query('SELECT * FROM role', function (err, results) {

            console.log("\n\n\x1b[44m ================= Role(s) =================\x1b[0m");
            console.table(results);
          });
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'newRoleID',
                message: "Please Enter Employees Role ID",
                // TODO: Switch to list generated from exisiting Role ID's
              },
            ])
            .then(answers => {


              let sqlCall = `INSERT INTO employee (first_name, last_name, role_id, manager_id)\nVALUES ("${tempFirstName}", "${tempLastName}", "${answers.newRoleID}", "${tempManagerID}");`;
              // console.log(sqlCall);

              db.query(sqlCall, function (err, results) {

              })

              addMenu();

            })
        })
    });
};

// ?============= updateEmployeeRole =============
async function updateEmployeeRole() {
  console.log("\n");
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
      // console.log(sqlCall);

      db.query(sqlCall, function (err, results) {

      })

      updateMenu();

    });

};


// ?============= removeDepartment =============
async function removeDepartment() {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'removeDepartmentID',
        message: "Please input the ID of the department you want to remove",
      },
    ])
    .then(answers => {

      // UPDATE employee\nSET role_id = ${ answers.removeDepartmentID } \nWHERE id = ${ answers.employeeID }
      let sqlCall = `DELETE FROM department WHERE department.id=${answers.removeDepartmentID}`;
      console.log(sqlCall)

      db.query(sqlCall, function (err, results) {
        removeMenu();
      })

    })

}

// ?============= removeRole =============
async function removeRole() {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'removeRoleID',
        message: "Please input the ID of the Role you want to remove",
      },
    ])
    .then(answers => {

      // UPDATE employee\nSET role_id = ${ answers.removeDepartmentID } \nWHERE id = ${ answers.employeeID }
      let sqlCall = `DELETE FROM role WHERE role.id=${answers.removeRoleID}`;
      // console.log(sqlCall)

      db.query(sqlCall, function (err, results) {
        removeMenu();
      })

    })

}

// ?============= removeEmployee =============
async function removeEmployee() {
  console.log("\n");
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'removeEmployeeID',
        message: "Please input the ID of the Employee you want to remove",
      },
    ])
    .then(answers => {

      // UPDATE employee\nSET role_id = ${ answers.removeDepartmentID } \nWHERE id = ${ answers.employeeID }
      let sqlCall = `DELETE FROM employee WHERE employee.id=${answers.removeEmployeeID}`;
      // console.log(sqlCall)

      db.query(sqlCall, function (err, results) {
        removeMenu();
      })

    })

}


// ?============= Init =============

function init() {

  welcome();

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

mainMenu();

//*=========== END of MAIN ==========

//!========================= EOF =========================