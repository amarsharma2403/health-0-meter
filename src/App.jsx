import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "./firebase";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(
            currentUser
          );

          setLoading(false);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl font-black">

        Loading Health-O-Meter 🚀

      </div>

    );

  }

  return user
    ? <Dashboard />
    : <Login />;

}