import Sidebar from "@/layouts/Sidebar";
import EmployeesTable from "@/components/admin/employees/EmployeesTable";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <EmployeesTable />
      </div>
    </>
  );
};

export default Home;
