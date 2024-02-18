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

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com', // Namecheap Private Email SMTP server
  port: 465, // Secure SMTP port
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'notifications@loveletter.bot', // Your full email address
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
