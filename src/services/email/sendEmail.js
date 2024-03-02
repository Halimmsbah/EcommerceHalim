import nodemailer from 'nodemailer'
import { emailTemplate } from './emailTemplete.js';

export const sendEmail=async(email)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: '"Halim 👻" <abdelhalim1143@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html:emailTemplate(email), // html body
    });

    console.log("Message sent: %s", info.messageId);


}