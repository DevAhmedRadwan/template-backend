"use strict";

// This is a custom function that our tests can use during setup to specify
// the return data of the function or to throw
let mockCredential = Object.create(null);
let notValidCredentialMethod = false;
function __setMockCredential(newMockCredential, newNotValidCredentialMethod) {
  mockCredential = newMockCredential;
  notValidCredentialMethod = newNotValidCredentialMethod;
}

// A custom version of `createCredential` that reads from the special mocked out
// values set via __setMockFiles
let createCredentialMock = jest.fn((credential) => {
  if (notValidCredentialMethod)
    throw new Error(`${credential.method} not a valid credential method`);
  return mockCredential;
});

// A custom version of `updateCredential` that reads from the special mocked out
// values set via __setMockFiles
let updateCredentialMock = jest.fn((oldCredential, newCredential) => {
  if (notValidCredentialMethod)
    throw new Error(`${newCredential.method} not a valid credential method`);
  return mockCredential;
});

module.exports = {
  createCredential: createCredentialMock,
  updateCredential: updateCredentialMock,
  __setMockCredential: __setMockCredential,
};
