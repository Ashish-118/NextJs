
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function SignupPage() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setloading] = React.useState(false);
    const onsignup = async () => {
        try {

            setloading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup successful", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Ashish  failed", error.message);
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 &&
            user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        < div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg
       mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setuser({ ...user, username: e.target.value })}
                placeholder="userName " />


            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg
       mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                placeholder="email " />


            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg
       mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                placeholder="password " />

            <button onClick={onsignup} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{buttonDisabled ? "No Signup" : "Signup"}</button>

            <Link href="/login">
                Visit Login page
            </Link>
        </div >
    )
}           