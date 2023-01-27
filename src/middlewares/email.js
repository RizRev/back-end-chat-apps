const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: "xcgdf0890@gmail.com",
    pass: "@Rizky12345",
    clientId: "838844442527-6383sjt27r27js8jc6cigu4itku3ffjq.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//04dD0II_9a4INCgYIARAAGAQSNwF-L9Ir2EEzJk58Q1Df86nmw8UdnPu1CFCoDV-NIxyX7499ZCdQkXJ6KaAJRqX0W2s0XcAA_64",
  },
});

module.exports = (email, subject, text) => {
  let mailOptions = {
    from: "xcgdf0890@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err);
      console.log('email not sent!');
    } else {
      console.log('Email sent successfully');
      return 'email sent successfully';
    }
  });
};

// require("dotenv").config();
// module.exports = async (email, subject, url, name) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//       },
//     });

//     await transporter.sendMail({
//       from: "Cafein",
//       to: email,
//       subject: `"Thanks For Registering your Account"`,
//       text: `"Hi! This is your token ${subject}"`,
//       html: `"Hi! This is your verif click <a href=http://localhost:4000/register/verif/${email}/${subject}> Here</a>"`
//         // html: "<div>
//       	// 			<h1>Email Confirmation</h1>
//         //               <h2>Hello ${name}</h2>
//         //               <p>Thank you for join us. Please confirm your email by clicking on the following link</p>
//         //               <a href='${url}'> Click here</a>
//       	// 			atau masuk ke link ${url}
//         //               </div>",
//     });
//     console.log("email sent successfully");
//     return "email sent successfully";
//   } catch (error) {
//     console.log("email not sent!");
//     console.log(error);
//     return "email not sent!";
//   }
// };