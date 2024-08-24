import { createTransport } from "nodemailer";
import { emailTemp } from "./emailTempelet.js";
// appnotetestiti@gmail.com

export default async function senEmails(email) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "appnotetestiti@gmail.com",
      pass: "lohw ywnu aauj nltc",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"APPNoteTest 👻" <appnotetestiti@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemp(), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
