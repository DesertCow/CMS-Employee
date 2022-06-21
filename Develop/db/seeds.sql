
USE CMSEmployee;

INSERT INTO department (id, name)
VALUES ("1", "Research"),
       ("2", "Human Resources"),
       ("3", "Marketing"),
       ("4", "Information Technology");


INSERT INTO role (id, title, salary,department_id)
VALUES ("20","Software Engr I","120000","1"),
       ("21","Software Engr II","150000","1"),
       ("22","Help Desk Tech","60000","2"),
       ("23","Manager","130000","3");
  

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("678","Dave","Smith","20","346"),
       ("436", "Mike","Bally","20","346"),
       ("432", "Kelly","Weathers","21","56"),
       ("899","Carl","Johnson","22","47");

       