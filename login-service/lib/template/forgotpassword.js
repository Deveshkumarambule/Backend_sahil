function forgotPassword(link) {
  return `<h4>Reset Password Page</h4></br>
                  <p> Please Rest Your Password By Clicking On Below Button</p>
                  <a href="http://localhost:4200/auth/reset-password?token=${link}"><button type="button">Click Me!</button></a>
                  `;
}

module.exports = {
  forgotPassword,
};
