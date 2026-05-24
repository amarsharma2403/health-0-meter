import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLogin, setIsLogin] =
    useState(true);

  const handleAuth =
    async () => {

      try {

        if (isLogin) {

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert(
            "Login Success 🚀"
          );

        } else {

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert(
            "Account Created 🚀"
          );

        }

      } catch (error) {

        alert(
          error.message
        );

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-5">

      <div className="bg-zinc-900/80 backdrop-blur-lg p-10 rounded-3xl w-full max-w-md border border-zinc-800 shadow-2xl">

        <h1 className="text-5xl font-black mb-3 text-center">

          Health-O-Meter 🚀

        </h1>

        <p className="text-center opacity-70 mb-8">

          AI Powered Smart Health Assistant

        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl bg-black border border-zinc-700 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl bg-black border border-zinc-700 mb-6 outline-none"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-2xl font-bold"
        >

          {isLogin
            ? "Login"
            : "Create Account"}

        </button>

        <p
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
          className="mt-6 text-center cursor-pointer text-purple-400"
        >

          {isLogin
            ? "Create Account"
            : "Already have account? Login"}

        </p>

      </div>

    </div>

  );

}