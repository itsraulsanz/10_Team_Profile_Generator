const Engineer = require('../lib/Engineer.js')

it("should creates an Engineer object", () => {
    const engineer = new Engineer ('David Bond', '9080', 'bond@test.com', 'bondDavid')
    
    expect(engineer.name).toEqual('David Bond');
    expect(engineer.id).toEqual('9080');
    expect(engineer.email).toEqual('bond@test.com');
    expect(engineer.github).toEqual('bondDavid');
});

it("should gets engineer's github username", () => {
    const engineer = new Engineer ('David Bond', '9080', 'bond@test.com', 'bondDavid')

    expect(engineer.getGithub()).toEqual('bondDavid');
});

it("should gets engineer's role", () => {
    const engineer = new Engineer ('David Bond', '9080', 'bond@test.com', 'bondDavid')

    expect(engineer.getRole()).toEqual('Engineer');
});