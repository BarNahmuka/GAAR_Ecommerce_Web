const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.userName = user.userName;
    this.url = url;
    this.from = 'nahmuka2@gmail.com';
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nahmuka2@gmail.com',
        pass: 'ixaaxkkuuutjimja'
      }
    });
  }

  async send(template, subject) {
    const templatePath = path.join(__dirname, `emailTemp/${template}.html`);   
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{userName}}', this.userName)
               .replace('{{url}}', this.url);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: `Hi ${this.userName},\n\nPlease visit the following link: ${this.url}`
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the GAAR Family!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token (valid for 10 min)');
  }
};
