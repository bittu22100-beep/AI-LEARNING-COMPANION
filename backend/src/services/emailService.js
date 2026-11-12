const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../utils/logger');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!env.smtp.user || !env.smtp.pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: false,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

  return transporter;
};

const sendEmail = async ({ to, subject, html, text }) => {
  const mailer = getTransporter();

  if (!mailer) {
    logger.warn(`Email not sent (SMTP not configured). To: ${to}, Subject: ${subject}`);
    return { simulated: true };
  }

  await mailer.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html,
    text,
  });

  return { sent: true };
};

module.exports = { sendEmail };
