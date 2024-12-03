import Sidebar from "@/layouts/Sidebar";
import Dashboard from "@/components/admin/Dashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
