import Sidebar from "@/layouts/Sidebar";
import PayrollDashboard from "@/components/admin/payroll/PayrollDashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <PayrollDashboard />
      </div>
    </>
  );
};

export default Home;
