"use client"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            console.log("response after logout ", response)
            toast.success('successfully logged out')
            router.push("/login")
        }
        catch (error: any) {
            console.log("Error logging out", error.message)
            toast.error("Error logging out")
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log("User details", res.data.data._id)
        setUser(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center
         min-h-screen py-2">

            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-2 rounded bg-green-500">{!user ? "Nothing" : <Link
                href={`/profile/${user}`}  >
                {user}
            </Link>
            }
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-purple-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                user details
            </button>
        </div>
    )
}