import Sidebar from "@/layouts/Sidebar";
import AccountingDashboard from "@/components/admin/accounting/AccountingDashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <AccountingDashboard />
      </div>
    </>
  );
};

export default Home;
