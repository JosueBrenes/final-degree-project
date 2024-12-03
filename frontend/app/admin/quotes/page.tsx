import Sidebar from "@/layouts/Sidebar";
import QuotesTable from "@/components/admin/quotes/QuotesTable";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <QuotesTable />
      </div>
    </>
  );
};

export default Home;
