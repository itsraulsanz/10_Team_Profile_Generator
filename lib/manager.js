const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, role) {
        super (name, id, email, role);
        this.officeNumber = officeNumber;
        this.role = role
    }

    getRole() {
        return this.role;
    }
    officeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;