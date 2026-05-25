import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chat from "./Chat";

function Dashboard() {
  return (
    <div className="flex bg-black min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-5">

        {/* Navbar */}
        <Navbar />

        {/* Chat Section */}
        <div className="mt-5 sm:mt-10">
          <Chat />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;