import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcryptjs = require("bcryptjs")
import jwt from 'jsonwebtoken';



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 })
        }
        // check if password is correct 
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
        }
        // create token data
        // console.log("i am here ")
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })


        // for user cookies
        const response = NextResponse.json({

            message: "Login successful",
            success: true,

        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}