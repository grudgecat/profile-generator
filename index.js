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
let outputString = "";
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

function addManager(name, id, email, phone) {
    const manager = new Manager(name, id, email, phone);
    myTeamCollection.push(manager);
}

function addEngineer(name, id, email, github) {
    const engineer = new Engineer(name, id, email, github);
    myTeamCollection.push(engineer);
}

function addIntern(name, id, email, school) {
    const intern = new Intern(name, id, email, school);
    myTeamCollection.push(intern);
}

function askQ() {
    return inquirer
      .prompt(controlQuestions)
      .then((data) => {
        const reply  = `${data.addanother}`;

        if(reply === 'Engineer') {
            return inquirer  
                .prompt(engineerQuestions)
                .then((data) => {
                    addEngineer(data.name, data.id, data.email, data.github);  
                    return askQ();
                })
                .catch((error) => {
                console.log(error);
                });            
        }
        else if(reply === 'Intern') {
            return inquirer  
                .prompt(internQuestions)
                .then((data) => {
                    addIntern(data.name, data.id, data.email, data.school); 
                    return askQ();  
                })
                .catch((error) => {
                console.log(error);
                });            
        }
        else {
            return;
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
    return askQ();  
  })
  .then(() => {
    generateTeamWebpage(myTeamCollection);
  })
.catch((error) => {
  console.log(error);
});

//WRITE TEAM TO WEBPAGE
function generateTeamCard(role, employee, id, email, special) {
    let pageCardOutput = `
    <div class='card'>
    <div class='card-header'>
        <h2>${employee}</h2>
        <h2>${role}</h2>
    </div>
    <div class='card-body'>
        <ul>
            <li>ID: ${id}</li>
            <li>EMAIL: ${email}</li>
            <li>${special}</li>
        </ul>
    </div>
    </div>
    `;
    return pageCardOutput;
}

function generateTeamWebpage(team) {
    outputString = pageHeader;
    team.forEach(element => {
        const role = element.getRole();
        const employee = element.getName();
        const id = element.getId();
        const email = element.getEmail();
        let special = ""; 

        if(role === 'Manager') {
            special = `PHONE: ${element.getOfficeNumber()}`;
        }
        else if(role === 'Engineer') {
            // special = `GITHUB NAME: https://github.com/${element.getGitHub()}`;
            special = `<a href="https://github.com/${element.getGitHub()}" target="_blank">GITHUB NAME: https://github.com/${element.getGitHub()}</a>`;
        }  
        else {
            special = `SCHOOL: ${element.getSchool()}`;
        }

        newCardOutput = generateTeamCard(role, employee, id, email, special);
        outputString = outputString + newCardOutput;
    });

    outputString = outputString + pageFooter;
    // console.log(outputString); 
    // fs.writeFile('./output.html', outputString); 

    const filepath =`./assets/output.html`
    fs.writeFile(filepath,`
        ${outputString}
        `, (err) => 
        err ? console.error(err) : console.log('Success!'))
}


