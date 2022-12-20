const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
  // Mail sending through MailTrap.io
  const transporter = nodeMailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'fde3438c6e8d74',
      pass: '3366a147c5454d',
    },
  });

  const mailOptions = {
    from: 'fde3438c6e8d74',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
