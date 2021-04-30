const Manager = require("../lib/Manager.js");

describe("Manager Class", () => {
  it("should creates a manager object", () => {
    const manager = new Manager(
      "David Bond",
      "9080",
      "bond@test.com",
      23
    );

    expect(manager.name).toEqual("David Bond");
    expect(manager.id).toEqual("9080");
    expect(manager.email).toEqual("bond@test.com");
    expect(manager.officeNumber).toEqual(23);
    expect(manager.role).toEqual("Manager");
  });

  it("should gets manager's office number", () => {
    const manager = new Manager(
      "David Bond",
      "9080",
      "bond@test.com",
      32
    );

    expect(manager.getOfficeNumber()).toEqual(32);
  });
});
