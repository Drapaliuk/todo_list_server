const nodemailer = require('nodemailer');
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'valiakusil1945@gmail.com',
    pass: '19452507Viktor',
  },
};

const transporter = nodemailer.createTransport(smtpConfig);
const mailer = async (to, subject, text) => {
  const options = {
    from: 'valiakusil1945@gmail.com',
    // to: 'vitaliidrapaliuk@gmail.com',
    to,
    subject,
    text,
  };

  return await transporter.sendMail(options);
};
exports.sendEmail = async (email, subject, data) => {
  let result = { err: null };

  try {
    await mailer(email, subject, data);
  } catch (error) {
      console.log(error)
    return result;
  }

  return result;
};
