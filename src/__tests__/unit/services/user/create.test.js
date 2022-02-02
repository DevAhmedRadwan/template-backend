const userCreateServiceFilePath = "../../../../services/user/create";
const credentialHandlerFilePath = "../../../../services/user/credentials-handler";

describe("services/user/create", () => {
  describe("dependancies working normally", () => {
    let userModelMock = {};

    const hash = "123456789";
    const salt = "123456789";
    const user = {
      firstName: "jon",
      lastName: "snow",
      credential: {
        method: "local",
        email: "jonsnow@gmail.com",
        password: "12345",
      },
    };

    beforeAll(() => {
      // mock credential handler
      jest.mock(credentialHandlerFilePath);
      require(credentialHandlerFilePath).__setMockCredential(
        {
          method: user.credential.method,
          loginData: [
            { key: "email", value: user.credential.email },
            { key: "hash", value: hash },
            { key: "salt", value: salt },
          ],
        },
        false
      );
      // user model mock
      userModelMock = {
        register: jest.fn(async function (newUser) {
          return Promise.resolve({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            credentials: newUser.credentials,
          });
        }),
      };
    });

    afterAll(() => {
      jest.unmock(credentialHandlerFilePath);
    });

    it("should call register function once", async () => {
      // setup
      const userCreateService = require(userCreateServiceFilePath);
      let createdUser = null;
      let error = null;
      // work
      try {
        createdUser = await userCreateService(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            credential: user.credential,
          },
          userModelMock
        );
      } catch (err) {
        error = err;
      }
      // assertions / expects
      expect(error).toBe(null);
      expect(userModelMock.register.mock.calls.length).toBe(1);
    });

    it("should pass the correct data to register function", async () => {
      // setup
      const userCreateService = require(userCreateServiceFilePath);
      let createdUser = null;
      let error = null;
      // work
      try {
        createdUser = await userCreateService(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            credential: user.credential,
          },
          userModelMock
        );
      } catch (err) {
        error = err;
      }
      // assertions / expects
      expect(error).toBe(null);
      expect(createdUser.firstName).toBe(user.firstName);
      expect(createdUser.lastName).toBe(user.lastName);
      expect(createdUser.credentials.length).toBe(1);
      expect(createdUser.credentials[0].method).toBe(user.credential.method);
      expect(createdUser.credentials[0].loginData).toEqual([
        { key: "email", value: user.credential.email },
        { key: "hash", value: hash },
        { key: "salt", value: salt },
      ]);
    });
  });

  describe("CredentialHandler fail to process the credential", () => {
    let userModelMock = {};

    const user = {
      firstName: "jon",
      lastName: "snow",
      credential: {
        method: "local",
        email: "jonsnow@gmail.com",
        password: "12345",
      },
    };

    beforeAll(() => {
      // mock credential handler
      jest.mock(credentialHandlerFilePath);
      require(credentialHandlerFilePath).__setMockCredential({}, true);
      // user model mock
      userModelMock = {
        register: jest.fn(async function (newUser) {
          return Promise.resolve({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            credentials: newUser.credentials,
          });
        }),
      };
    });

    afterAll(() => {
      jest.unmock(credentialHandlerFilePath);
    });

    it("should not catch the credential handler error", async () => {
      // setup
      const userCreateService = require(userCreateServiceFilePath);
      let createdUser = null;
      let error = null;
      // work
      try {
        createdUser = await userCreateService(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            credential: user.credential,
          },
          userModelMock
        );
      } catch (err) {
        error = err;
      }
      // assertions / expects
      expect(createdUser).toBe(null);
      expect(error.message).toBe(
        `${user.credential.method} not a valid credential method`
      );
    });
  });

  describe("CredentialHandler fail to process the credential", () => {
    let userModelMock = {};

    const user = {
      firstName: "jon",
      lastName: "snow",
      credential: {
        method: "local",
        email: "jonsnow@gmail.com",
        password: "12345",
      },
    };

    beforeAll(() => {
      // mock credential handler
      jest.mock(credentialHandlerFilePath);
      require(credentialHandlerFilePath).__setMockCredential({}, true);
      // user model mock
      userModelMock = {
        register: jest.fn(async function (newUser) {
          return Promise.resolve({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            credentials: newUser.credentials,
          });
        }),
      };
    });

    afterAll(() => {
      jest.unmock(credentialHandlerFilePath);
    });

    it("should not catch the regester error", async () => {
      // setup
      const userCreateService = require(userCreateServiceFilePath);
      let createdUser = null;
      let error = null;
      // work
      try {
        createdUser = await userCreateService(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            credential: user.credential,
          },
          userModelMock
        );
      } catch (err) {
        error = err;
      }
      // assertions / expects
      expect(createdUser).toBe(null);
      expect(error.message).toBe(
        `${user.credential.method} not a valid credential method`
      );
    });
  });
});
