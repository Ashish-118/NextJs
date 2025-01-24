
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function LoginPage() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setloading] = React.useState(false);

    const onLogin = async () => {
        try {
            setloading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful", response.data);
            toast.success("Login successful!");
            router.push("/profile");
        }
        catch (error: any) {
            console.log("Ashish Login failed", error.message);
            toast.error(error.message);

        }
        finally {
            setloading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);



    return (
        < div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />


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

            <button onClick={onLogin} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>

            <Link href="/signup">
                Visit Signup page
            </Link>
        </div >
    )
}           