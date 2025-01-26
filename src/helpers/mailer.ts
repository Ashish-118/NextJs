import nodemailer from 'nodemailer';
import User from "@/model/userModel.js";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log("this is the hashed token ", hashedToken);
        if (emailType === 'VERIFY') {
            console.log("inside verifuy")
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
                { new: true, runValidators: true }
            )

        }
        else if (emailType === 'RESET') {
            console.log("inside reset")
            await User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 },
                { new: true, runValidators: true }
            )
        }

        console.log("before transport")
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
            from: 'ashish@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email " : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to 
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and pase the link below in your browser. <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}