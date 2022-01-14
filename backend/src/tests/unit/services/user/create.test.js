const service = require("../../../../services");

describe("user service create unit tests", () => {
  it("should call registerUser function once", async () => {
    // setup
    let firstName = "john";
    let lastName = "snow";
    let credential = {
      method: "local",
      email: "johnsnow@gmail.com",
      password: "12345",
    };
    let userModelMock = jest.fn(function (user) {
      this.register = jest.fn(async function () {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          credentials: user.credentials,
        };
      });
      return this;
    });
    // work
    try {
      await service.user.create(
        { firstName, lastName, credential },
        userModelMock
      );
    } catch (err) {}
    // assertions / expects
    expect(userModelMock.mock.calls.length).toBe(1);
  });

  it("should pass the correct data to registerUser", async () => {
    // setup
    let firstName = "john";
    let lastName = "snow";
    let credential = {
      method: "local",
      email: "johnsnow@gmail.com",
      password: "12345",
    };
    let userModelMock = jest.fn(function (user) {
      this.registerUser = jest.fn(async function () {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          credentials: user.credentials,
        };
      });
      return this;
    });
    // work
    let user = null;
    let error = null;
    try {
      user = await service.user.create(
        { firstName, lastName, credential },
        userModelMock
      );
    } catch (err) {
      error = err;
    }
    // assertions / expects
    expect(error).toBe(null);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.credentials.length).toBe(1);
    expect(user.credentials[0].method).toBe(credential.method);
    expect(user.credentials[0].loginData).toEqual([
      { key: "email", value: credential.email },
      { key: "hash", value: expect.any(String) },
      { key: "salt", value: expect.any(String) },
    ]);
  });

  it("should throw error for unknown or unsupported credential", async () => {
    // setup
    let firstName = "john";
    let lastName = "snow";
    let credential = {
      method: "unknown",
    };
    let userModelMock = jest.fn(function (user) {
      this.registerUser = jest.fn(async function () {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          credentials: user.credentials,
        };
      });
      return this;
    });
    // work
    let user = null;
    let error = null;
    try {
      user = await service.user.create(
        { firstName, lastName, credential },
        userModelMock
      );
    } catch (err) {
      error = err;
    }
    // assertions / expects
    expect(user).toBe(null);
    expect(error.message).toBe(
      `${credential.method} not a valid credential method!`
    );
  });
});
