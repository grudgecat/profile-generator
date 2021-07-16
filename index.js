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
//used to build output string that will become full webpage
let outputString = "";
//page header 
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

//end of webpage
const pageFooter = `
</main>

</body>
</html>
`;

//generate stylesheet
const styles = `
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-color: white;
}

header {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  background-color: blueviolet;
  color: white;
}

h2 {
  margin-left: 10px;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 0px;
}

main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 25px;
}

li {
    list-style: none;
    padding: 5px;
    border-style: dotted;
    border-color: darkgray;
    margin: 5px 0px 5px -35px;
}

.card {
  background-color: silver;
  border-radius: 5px;
  border-width: 1px;
  margin-bottom: 25px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
  color: white;
  width: 400px;
  padding: 10px;
}

.card-header {
    background-color: blueviolet;
    width: 100%;
    margin-top: -20px;
    border-radius: 5px;
    border-width: 1px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
}

.card-body {
  color: black;
}
`

//GENERATE NEW EMPLOYEE OBJECTS & ADD TO TEAM COLLECTION
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

//ASK USER IF THEY WANT TO CONTINUE ADDING TEAM MEMBERS
//Asks user if they want to add additional team members, 
//uses type of employee to call add function for new member, then returns askQ to get next team member OR returns nothing to break chain
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

//INITIATE FUNCTION CALLS
//GET MANAGER, THEN GET TEAM MEMBERS (askQ), THEN WRITE TO WEBPAGE
//get manager first
inquirer  
  .prompt(managerQuestions)
  .then((data) => {
    addManager(data.name, data.id, data.email, data.phone); 
    //ask for more team members in recursive path until done
    return askQ();  
  })
  .then(() => {
    generateTeamWebpage(myTeamCollection);
  })
.catch((error) => {
  console.log(error);
});

//CREATE NEW DATA CARD HTML BASED ON TEAM MEMBER DATA
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

//WRITES GENERATED HTML STRING TO HTML FILE (as output.html in assets folder)
//Takes team collection array as parameter, uses constants pageHeader & pageFooter to build full page
//Requires imports: Employee classes defined in lib folder & fs module import to write docuemnt
function generateTeamWebpage(team) {
    //add page header to output string
    outputString = pageHeader;
    const filepath =`./assets/`;
    const outputHTML = `output.html`;
    const outputCSS = `styles.css`;

    //add each team member from team collection array to output string in a loop
    team.forEach(element => {
        const role = element.getRole();
        const employee = element.getName();
        const id = element.getId();
        const email = element.getEmail();
        let special = ""; 
        //adjust last variable based on employee type
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
    //add page footer to output string
    outputString = outputString + pageFooter;
    //write webpage from output string content
    fs.writeFile(`${filepath}${outputHTML}`,`
        ${outputString}
        `, (err) => 
        err ? console.error(err) : console.log('output.html written'))

    fs.writeFile(`${filepath}${outputCSS}`,`
        ${styles}
        `, (err) => 
        err ? console.error(err) : console.log('styles.css written'))
}
