import { GOOGLE_PASS } from '../../config';
import nodemailer from 'nodemailer';

async function sendMail(sendto: string, subject: string, message: string) {
    // 1. create an email transporter.
    // SMTP (Simple Mail Transfer Protocol)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'souravsantipur9635@gmail.com',
            pass: GOOGLE_PASS,
        },
    });

    // 2. configure email content.
    const mailOptions = {
        from: 'souravsantipur9635@gmail.com',
        to: sendto,
        subject: subject,
        text: message,
    };

    // 3. send email
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email send failed with error:', error);
    }
}

export default sendMail;
