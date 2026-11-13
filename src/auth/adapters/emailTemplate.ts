export const emailTemplate = {
  registration(code: string) {
    return `<h1>Thanks for your registration</h1>
            <p>
              To finish registration please follow the link below:<br>
              <a href='https://somesite.com/confirm-registration?code=${code}'>complete registration</a>
            </p>
    `;
  },

  passwordRecovery(code: string) {
    return `<h1>Password recovery</h1>
            <p>
              To finish password recovery please follow the link below:<br>
              <a href='https://somesite.com/confirm-registration?code=${code}'>recovery password</a>
            </p>
    `;
  },
};
