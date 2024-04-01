"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// sendMail(to, subject, message):

const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = function (to, subject, message) {
  //? GoogleMail (gmail):
  //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  transporter.sendMail(
    {
      from: EMAIL_USER,
      to: to,
      subject: subject,
      text: message,
      html: message,
    },
    (error, success) => {
      error ? console.log("error:", error) : console.log("success:", success);
    }
  );
};
