const inquirer = require("inquirer");

// const Employee = require("./lib/Employee");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const Manager = require("./lib/Manager");

const fs = require("fs");

const util = require('util');
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
      type: 'input',
      name: 'github',
      message: `What is the ${employeeType}'s github user?`,
      when: () => employeeType === ROLE.ENGINEER
    },
        {
      type: 'input',
      name: 'school',
      message: `What is the ${employeeType}'s school?`,
      when: () => employeeType === ROLE.INTERN
    },
    {
      type: "list",
      name: "newRole",
      message: "Which type of team member would you like to add?",
      choices: [
        ROLE.ENGINEER,
        ROLE.INTERN,
        ROLE.NO,
      ],
    },
  ];

  return inquirer.prompt(promptArray);
}

async function collectEmployees(employees = [], employeeType = ROLE.MANAGER) {
  // destructuring the data from collectEmployeeData
  // `newRole` says what to do next
  // the rest of the object (...employeeData) contains the employee data
  const { newRole, ...employeeData } = await collectEmployeeData(employeeType);
  employeeData.type = employeeType;
  // add the employeeData to the final array of employees
  employees.push(employeeData);

  if (newRole != ROLE.NO) {
    return collectEmployees(employees, newRole);
  } else {
    return employees;
  }
}

function getCardHtml(answers) {
  let html = "";
  for (i = 0; i < answers; i++) {
    console.log(answers[i].name)
      html += `<div class="col-12 col-sm-6 col-md-4">
          <div class="card">
            <div class="card-header bg-dark text-white">
              <h3 class="display-4">${answers[i].name}</h3>
              <p class="lead"><i class="fas fa-mug-hot"></i>${answers[i].type}</p>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item">ID: ${answers[i].id}</li>
                <li class="list-group-item">
                  Email: <a href="mailto:${answers[i].email}">${answers[i].email}</a>
                </li>
                <li class="list-group-item">Office number: ${answers[i].officeNumber}</li>
              </ul>
            </div>
          </div>
        </div>
        `}
  return html;
}

const generateHTML = (answers) =>
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
        ${getCardHtml()}
        </div>
      </div>
    </body>
  </html>
  `;

const init = () => {
  collectEmployees()
    .then((answers) => { 
      console.log(answers);
      writeFileAsync('./dist/index.html', generateHTML(answers));
    })
    .then(() => console.log("Successfully wrote to index.html"))
    .catch((err) => console.error(err));
};

init();