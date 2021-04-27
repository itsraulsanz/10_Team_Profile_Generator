const Engineer = require("./Engineer");

class Engineer extends Employee {
    constructor(name, id, email, role) {
        super (name, id, email, role);
        this.github = github;
        this.role = role
    }

    getRole() {
        return this.role;
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;