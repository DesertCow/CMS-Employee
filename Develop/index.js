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
          return;
          break;
      }


    })


}


// ?============= viewDepartments =============
function viewDepartments() {
  console.log("viewDepartments");

  mainMenu();
};

// ?============= viewRoles =============
function viewRoles() {
  console.log("viewRoles");

  mainMenu();
};

// ?============= viewEmployees =============
function viewEmployees() {
  console.log("viewEmployees");

  mainMenu();
};

// ?============= addDepartment =============
function addDepartment() {
  console.log("addDepartment");

  mainMenu();
};

// ?============= addRole =============
function addRole() {
  console.log("addRole");

  mainMenu();
};


// ?============= addEmployee =============
function addEmployee() {
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