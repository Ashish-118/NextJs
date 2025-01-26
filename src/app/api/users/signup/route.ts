import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from 'bcryptjs';
const bcryptjs = require("bcryptjs")

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody

        console.log("signup Api has been called ", reqBody);



        //check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: 'User already exists' },
                { status: 400 }
            );
        }
        console.log("at findone region")
        // hash password

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //create new user


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        //send Verificationm Email

        console.log("at send email region")
        const savedUser = await newUser.save()
        console.log("This is new saved user", savedUser);
        const sendEmailRes = await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id
        })
        console.log("this is the sendEmail in singup api ", sendEmailRes)
        return NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedUser
        })


    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        );
    }
}