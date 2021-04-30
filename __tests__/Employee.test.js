const Employee = require('../lib/Employee.js');

it("should creates an employee object", () => {
    const employee = new Employee("Raul Sanz", 1234, "raul@test.com");

    expect(employee.name).toEqual("Raul Sanz");
    expect(employee.id).toEqual(1234);
    expect(employee.email).toEqual("raul@test.com");
});

it("should gets the employee's name", () => {
    const employee = new Employee('Raul Sanz', '1234', 'raul@test.com');

    expect(employee.getName()).toEqual("Raul Sanz");
});

it("should gets the employee's ID", () => {
    const employee = new Employee('Raul Sanz', '1234', 'raul@test.com');

    expect(employee.getId()).toEqual('1234');
});

it("should gets the employee's email", () => {
    const employee = new Employee('Raul Sanz', '1234', 'raul@test.com');

    expect(employee.getEmail()).toEqual('raul@test.com');
});

it("should gets the employee's role", () => {
    const employee = new Employee('Raul Sanz', '1234', 'raul@test.com', 'Employee');

    expect(employee.getRole()).toEqual('Employee');
});