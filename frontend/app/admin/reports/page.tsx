import Sidebar from "@/layouts/Sidebar";
import ReportsDashboard from "@/components/admin/reports/ReportsDashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <ReportsDashboard />
      </div>
    </>
  );
};

export default Home;
