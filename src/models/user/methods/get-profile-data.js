module.exports = function getProfileData() {
  let profileData = {
    firstName: this.firstName,
    lastName: this.lastName,
    imageURI: this.imageURI,
    credentials: [],
  };

  // add the local credential after removing sensitive data
  if (this.hasCredentialMethod("local")) {
    let localLoginData = this.parseLoginData("local");
    profileData.credentials.push({
      method: "local",
      email: localLoginData.email,
    });
  }

  return profileData;
};
