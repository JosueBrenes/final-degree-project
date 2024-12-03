import Sidebar from "@/layouts/Sidebar";
import VacationsTable from "@/components/admin/employees/vacations/VacationsTable";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <VacationsTable />
      </div>
    </>
  );
};

export default Home;
