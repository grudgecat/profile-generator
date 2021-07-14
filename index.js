const fs = require('fs');
const inquirer = require('inquirer');
const Intern = require('./lib/intern.js');
const Engineer = require('./lib/engineer.js');
const Manager = require('./lib/manager.js');

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
        name: "githubname",
        message: "What is the engineer GitHub user name?"
    }
];

const controlQuestions = [
    {
        type: "checkbox",
        name: "addanother",
        message: "Do you want to add an additional employee?"
        choices: ['Engineer', 'Intern', 'Manager', 'No additional employees to add',]
    }
];

