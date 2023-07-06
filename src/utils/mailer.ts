import { HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { codeGenerator } from './codeGenerator';

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export async function mail(email: string, verificationCode: string) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Account Verification',
        text: `Your verification code is ${verificationCode}`
    };
    try {
        return transporter.sendMail(mailOptions);
    } catch (error) {
        return { code: HttpStatus.INTERNAL_SERVER_ERROR, message: "Failed to send verification email" };
    }
}
