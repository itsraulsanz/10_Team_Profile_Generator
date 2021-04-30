const Intern = require("../lib/Intern.js");

describe("Intern Class", () => {
  it("should creates an intern object", () => {
    const intern = new Intern(
      "David Bond",
      "9080",
      "bond@test.com",
      "Manchester University"
    );

    expect(intern.name).toEqual("David Bond");
    expect(intern.id).toEqual("9080");
    expect(intern.email).toEqual("bond@test.com");
    expect(intern.school).toEqual("Manchester University");
    expect(intern.role).toEqual("Intern");
  });

  it("should gets intern's school", () => {
    const intern = new Intern(
      "David Bond",
      "9080",
      "bond@test.com",
      "Manchester Uni"
    );

    expect(intern.getSchool()).toEqual("Manchester Uni");
  });
});
