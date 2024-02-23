import sentMessage from './sentMessage';
import pendingMessage from './pendingMessage';

const nodemailer = require('nodemailer');

const templates:{
  [key:string]: string
} = {
  sentMessage,
  pendingMessage,
};

const replaceAll = (text:string, search:string, replacement:string) => {
  let result = text;
  while (result.includes(search)) {
    result = result.replace(search, replacement);
  }
  return result;
};

export const renderHtmlEmail = (templateName:string, variables:{ [key:string]: string } = {}) => {
  let content = templates[templateName];
  Object.keys(variables).forEach((key) => {
    content = replaceAll(content, `{{${key}}}`, variables[key]);
  });
  return content;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.eu.mailgun.org',
  port: 587,
  secure: true,
  auth: {
    user: 'postmaster@mg.loveletter.bot',
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = (message:any) => {
  transporter.sendMail(message, (error:any, info:any) => {
    if (error) {
      console.log('sendEmail failed:', error, info);
      return true;
    }
    console.log('sendEmail success:', info);
    return false;
  });
};
