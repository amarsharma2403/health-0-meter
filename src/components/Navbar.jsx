import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    await signOut(auth);

    navigate("/");

  };

  return (

    <div className="bg-zinc-900 p-5 flex items-center justify-between rounded-xl">

      <h1 className="text-2xl font-bold text-white">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-black px-5 py-2 rounded-lg font-bold"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;