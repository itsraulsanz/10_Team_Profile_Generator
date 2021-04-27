const Intern = require("./Intern");

class Intern extends Employee {
    constructor(name, id, email, role) {
        super (name, id, email, role);
        this.school = school;
        this.role = role
    }

    getRole() {
        return this.role;
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;