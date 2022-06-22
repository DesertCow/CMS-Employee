
USE CMSEmployee;

INSERT INTO department (name)
VALUES ("Research"),
       ("Human Resources"),
       ("Marketing"),
       ("Information Technology");


INSERT INTO role (title, salary,department_id)
VALUES ("Software Engr I","120000","1"),
       ("Software Engr II","150000","1"),
       ("Help Desk Tech","60000","2"),
       ("Manager","130000","3");
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dave","Smith","1",NULL),
       ("Mike","Bally","1",NULL),
       ("Kelly","Weathers","2","1"),
       ("Matt","Power","2","2"),
       ("Eric","Moore","3","1"),
       ("Carl","Johnson","2","3");

       