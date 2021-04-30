const inquirer = require("inquirer");

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const fs = require("fs");

const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const ROLE = {
  MANAGER: "Manager",
  ENGINEER: "Engineer",
  INTERN: "Intern",
  NO: "I don't want to add any more team members",
};

function collectEmployeeData(employeeType = ROLE.MANAGER) {
  const promptArray = [
    {
      type: "input",
      name: "name",
      message: `What is the ${employeeType}'s name?`,
    },
    {
      type: "input",
      name: "id",
      message: `What is the ${employeeType}'s ID?`,
    },
    {
      type: "input",
      name: "email",
      message: `What is the ${employeeType}'s email?`,
    },
    {
      type: "input",
      name: "officeNumber",
      message: `What is the ${employeeType}'s office number?`,
      when: () => employeeType === ROLE.MANAGER,
    },
    {
      type: "input",
      name: "github",
      message: `What is the ${employeeType}'s github user?`,
      when: () => employeeType === ROLE.ENGINEER,
    },
    {
      type: "input",
      name: "school",
      message: `What is the ${employeeType}'s school?`,
      when: () => employeeType === ROLE.INTERN,
    },
    {
      type: "list",
      name: "newRole",
      message: "Which type of team member would you like to add?",
      choices: [ROLE.ENGINEER, ROLE.INTERN, ROLE.NO],
    },
  ];

  return inquirer.prompt(promptArray);
}

async function collectEmployees(employees = [], employeeType = ROLE.MANAGER) {
  // destructuring the data from collectEmployeeData
  // `newRole` says what to do next
  // the rest of the object (...employeeData) contains the employee data
  const { newRole, ...employeeData } = await collectEmployeeData(employeeType);
  const { name, id, email, officeNumber, github, school } = employeeData;
  
  switch (employeeType) {
    case 'Manager':
      employees.push(new Manager(name, id, email, officeNumber));
      break;
    case 'Engineer':
      employees.push(new Engineer(name, id, email, github));
      break;
    case 'Intern':
      employees.push(new Intern(name, id, email, school));
      break;        
  }

  if (newRole != ROLE.NO) {
    return collectEmployees(employees, newRole);
  } else {
    return employees;
  }
}

function getCardsHtml(employees) {
  const html = [];
  employees.forEach(
    (employee) =>
    html.push(
      `<div class="col-12 col-sm-6 col-md-4">
    <div class="card">
      <div class="card-header bg-dark text-white">
        <h3 class="display-4">${employee.getName()}</h3>
        <p class="lead"><i class="fas fa-mug-hot"></i> ${employee.getRole()}</p>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">ID: ${employee.getId()}</li>
          <li class="list-group-item">
            Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a>
          </li>          
          ${employee.getRole() === 'Manager' ? `<li class="list-group-item">Office number: ${employee.getOfficeNumber()}</li>` : ''}
          ${employee.getRole() === 'Engineer' ? `<li class="list-group-item">Github: <a href="https://github.com/${employee.getGithub()}/">${employee.getGithub()}</a></li>` : ''}
          ${employee.getRole() === 'Intern'? `<li class="list-group-item">School: ${employee.getSchool()}</li>`: ''}    
        </ul>
      </div>
    </div>
  </div>`)
  );
  return html.join('');
}

const generateHTML = (employees) =>
  `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            />
            <script
              src="https://kit.fontawesome.com/a9d6910f06.js"
              crossorigin="anonymous"
            ></script>
            <title>My team</title>
          </head>
          <body>
            <header
              class="jumbotron jumbotron-fluid bg-danger text-white d-flex justify-content-center"
            >
              <h1>My team</h1>
            </header>
        
            <div class="container bg-white">
              <div class="row d-flex justify-content-center">
              ${getCardsHtml(employees)}
              </div>
            </div>
          </body>
        </html>
        `;

const init = () => {
  collectEmployees()
    .then((employees) => {
      writeFileAsync("./dist/index.html", generateHTML(employees));
    })
    .then(() => console.log("Successfully wrote to index.html"))
    .catch((err) => console.error(err));
};

init();