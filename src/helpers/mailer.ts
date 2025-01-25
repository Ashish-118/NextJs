import nodemailer from 'nodemailer';
import User from "@/model/userModel.js";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = bcryptjs.hash(userId.toString(), 10)
        if (emailType === 'verify') {
            await User.findByIdAndUpdate(
                userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            )

        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            )
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.nodemailerUser!,
                pass: process.env.nodemailerPass!
                //TODO: add these credentials to .env file
            }
        });

        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email " : "Reset Your Password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}"> here </a> to $
            {emailType==="VERIFY"?"verify your email":"reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}