const mailer = require("nodemailer");

const mailSend = async (to, subject, text, html) => {
  const mailOptions = {
    from: "rp0096745@gmail.com",
    to: to,
    subject: subject,
    text: text,
    // html: "<h1>This is testing of nodemailer</h1>",
    html: html
  };

  const transporter = mailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "rp0096745@gmail.com",
      pass: "ariwcwxcibbpqrsq",
    },
  });

  try {
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = {
    mailSend
};

// Example usage:
// mailSend("rpatel0096745@gmail.com", "Test", "Welcome to app...")
//   .then((response) => {
//     console.log("Email sent successfully:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending email:", error);
//   });
