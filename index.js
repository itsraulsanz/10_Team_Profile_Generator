const inquirer = require("inquirer");

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const fs = require("fs");

function startInquirer() {
  const promptArray = [
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your ID?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
    },
    {
      type: "list",
      name: "role",
      message: "What is your role?",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ];
  return inquirer.prompt(promptArray);
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
          

        </div>
      </div>
    </body>
  </html>
  `;

const init = () => {
  startInquirer()
    .then((answers) => writeFileAsync("index.html", generateHTML(answers)))
    .then(() => console.log("Successfully wrote to index.html"))
    .catch((err) => console.error(err));
};

init();
