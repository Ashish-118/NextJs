import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/model/userModel.js"

connect()


export async function POST(request: NextRequest) {
    try {

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
