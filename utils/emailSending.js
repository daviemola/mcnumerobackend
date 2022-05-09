import nodemailer from "nodemailer";
import dotenv from "dotenv";

//load env variables
dotenv.config({ path: "../config/.env" });

export default async function sendMail(options) {
  //   console.log(process.env.SENDINBLUE_HOST);

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SENDINBLUE_HOST,
      port: process.env.SENDINBLUE_PORT,
      auth: {
        user: process.env.SENDINBLUE_LOGIN,
        pass: process.env.SENDINBLUE_PASS,
      },
    });

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const result = await transport.sendMail(mailOptions).catch((err) => {
      console.log(err);
      return err;
    });
    // console.log(result);
    // console.log(`Email sent...` + result);
    return result;
  } catch (err) {
    return err;
  }
}

// const message = `You have just requested a list of all invoices related to this account.`;
// // try {
// const res = await sendMail({
//   email: "daviemola@gmail.com",
//   subject: "Billing List Request",
//   message,
// })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err + "sth"));

// console.log(res);

// //   console.log("Email sent " + res);
// // } catch (err) {
// //   console.log("error... " + err);
// // }
