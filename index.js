const fs = require('fs');
const inquirer = require('inquirer');
const Intern = require('./lib/intern.js');
const Engineer = require('./lib/engineer.js');
const Manager = require('./lib/manager.js');
let myTeamCollection = [];

//INQUIRER QUESTION VARIABLES
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the new manager?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee email address?"
    },
    {
        type: "input",
        name: "phone",
        message: "What is the manager phone number?"
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the new intern?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What school is the intern attending?"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the new engineer?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee email address?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer GitHub user name?"
    }
];

const controlQuestions = [
    {
        type: "checkbox",
        name: "addanother",
        message: "Do you want to add an additional employee?",
        choices: ['Engineer', 'Intern', 'None',],
    }
];


//OUTPUT VARIABLES
const pageHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./styles.css" />
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>

<main>

`;

const pageFooter = `
</main>

</body>
</html>
`;

// let pageCardOutput = `
// <div class='card'>
// <div class='card-header'>
//     <h2>${name}</h2>
//     <h2>${role}</h2>
// </div>
// <div class='card-body'>
//     <ul>
//         <li>${id}</li>
//         <li>${email}</li>
//         <li>${special}</li>
//     </ul>
// </div>
// </div>
// `;

function addManager(name, id, email, phone) {
    const manager = new Manager(name, id, email, phone);
    myTeamCollection.push(manager);
    console.log(myTeamCollection);
}

function addEngineer(name, id, email, github) {
    const engineer = new Engineer(name, id, email, github);
    myTeamCollection.push(engineer);
    console.log(myTeamCollection);
}

function addIntern(name, id, email, school) {
    const intern = new Intern(name, id, email, school);
    myTeamCollection.push(intern);
    console.log(myTeamCollection);
}

function askQ() {
    inquirer
      .prompt(controlQuestions)
      .then((data) => {
        const reply  = `${data.addanother}`;

        if(reply === 'Engineer') {
            inquirer  
                .prompt(engineerQuestions)
                .then((data) => {
                    addEngineer(data.name, data.id, data.email, data.github); 
                    // return "";     
                })
                .then((data) => {
                    askQ();
                })
                .catch((error) => {
                console.log(error);
                });            
        }
        else if(reply === 'Intern') {
            inquirer  
                .prompt(internQuestions)
                .then((data) => {
                    addIntern(data.name, data.id, data.email, data.school); 
                    // return "";     
                })
                .then((data) => {
                    askQ();
                })
                .catch((error) => {
                console.log(error);
                });            
        }
        else {
            return "None";
        }
      })
    .catch((error) => {
      console.log(error);
    });
}

//GET MANAGER, THEN GET TEAM MEMBERS
inquirer  
  .prompt(managerQuestions)
  .then((data) => {
    addManager(data.name, data.id, data.email, data.phone);    
  })
  .then((reply) => {
    askQ();
  })
.catch((error) => {
  console.log(error);
});

