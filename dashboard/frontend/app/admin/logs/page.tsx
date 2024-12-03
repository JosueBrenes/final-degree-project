import Sidebar from "@/layouts/Sidebar";
import LogsDashboard from "@/components/admin/logs/LogsDashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <LogsDashboard />
      </div>
    </>
  );
};

export default Home;
