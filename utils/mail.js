// const nodemailer = require('nodemailer');
// const sgTransport = require('nodemailer-sendgrid-transport')
// const smtpConfig = {
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // use SSL
//   auth: {
//     user: 'valiakusil1945@gmail.com',
//     pass: '19452507Viktor',
//   },
// };

// const ADMIN_EMAIL_API_KEY = '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'

// // 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
// // const transporter = nodemailer.createTransport(smtpConfig);

// const transporter = nodemailer.createTransport(sgTransport({
//   auth: {
//       api_user: "vitalii", 
//       api_key: ADMIN_EMAIL_API_KEY // your api key here, better hide it in env vars
//   }
// }))

// const mailer = async (to, subject, text) => {
//   const options = {
//     from: 'valiakusil1945@gmail.com',
//     // to: 'vitaliidrapaliuk@gmail.com',
//     to,
//     subject,
//     text,
//   };

//   return await transporter.sendMail(options);
// };
// exports.sendEmail = async (email, subject, data) => {
//   let result = { err: null };

//   try {
//     await mailer(email, subject, data);
//   } catch (error) {
//       console.log(error)
//     return result;
//   }

//   return result;
// };


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const msg = {
  to: 'dmitro925@gmail.com',
  from: 'valiakusil1945@gmail.com', // Use the email address or domain you verified above
  subject: 'ЗБІЛЬШЕННЯ ПЕНІСА ЗА 2 ТИЖНІ',
  text: 'Дімас, прівєт!',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};



exports.sendEmail = async (email, subject, data) => {
  let result = { err: null };

  try {
    await sgMail.send(msg);
  } catch (error) {
      console.log(error)
    return result;
  }

  return result;
};