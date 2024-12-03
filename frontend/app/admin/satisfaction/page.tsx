import Sidebar from "@/layouts/Sidebar";
import SatisfactionDashboard from "@/components/admin/satisfaction/SatisfactionDashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <SatisfactionDashboard />
      </div>
    </>
  );
};

export default Home;
