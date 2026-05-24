const nodemailer = require("nodemailer");

const ejs = require("ejs");

const path = require("path");

/**
 * Mail Transporter
 */
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send Email
 */
const sendEmail = async (to, subject, template, data) => {
  try {
    /**
     * Template Path
     */
    const templatePath = path.join(
      __dirname,
      "../views/emails",
      `${template}.ejs`,
    );

    /**
     * Render HTML
     */
    const html = await ejs.renderFile(templatePath, data);

    /**
     * Send Mail
     */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to,

      subject,

      html,
    });

    console.log(`✓ Email Sent To ${to}`);
  } catch (error) {
    console.error("Email Error:", error.message);
  }
};

module.exports = sendEmail;
