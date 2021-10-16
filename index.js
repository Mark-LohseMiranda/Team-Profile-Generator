const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const generateHTML = require('./util/generateHtml');
const fs = require('fs');

const employeeList = [];

function getManager() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the team manager\'s name:'
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the team manager\'s ID:'
        },
        {
            name: 'email',
            type: 'input',
            message: 'What is the team manager\'s email:'  
        },
        {
            name: 'office',
            type: 'input',
            message: 'What is the team manager\'s office number:'
        },
    ]).then(({name, id, email, office}) => {
        employeeList.push(new Manager(name, id, email, office));
        getEmployees();
    })
}

function getEmployees() {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do:',
            choices: ['Add an engineer', 'Add an intern', 'Build team']
        },
    ]).then(answers => {
        switch (answers.choice){
            case 'Add an engineer':
                addEngineer();
                break;
            case 'Add an intern':
                addIntern();
                break;
            default:
                buildTeam();
                break
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the engineer\'s name:'
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the engineer\'s ID:'
        },
        {
            name: 'email',
            type: 'input',
            message: 'What is the engineer\'s email:'  
        },
        {
            name: 'github',
            type: 'input',
            message: 'What is the engineer\'s Github username:'
        },
    ]).then(({name, id, email, github}) => {
        employeeList.push(new Engineer(name, id, email, github));
        getEmployees();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the intern\'s name:'
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the intern\'s ID:'
        },
        {
            name: 'email',
            type: 'input',
            message: 'What is the intern\'s email:'  
        },
        {
            name: 'school',
            type: 'input',
            message: 'What is the intern\'s school:'
        },
    ]).then(({name, id, email, school}) => {
        employeeList.push(new Intern(name, id, email, school));
        getEmployees();
    })
}

function buildTeam() {
    fs.writeFile("./dist/index.html", generateHTML(employeeList), (err) =>
    err ? console.log(err) : console.log('Your index.html file is in the dist folder.'));
}

getManager();