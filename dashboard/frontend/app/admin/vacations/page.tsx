import Sidebar from "@/layouts/Sidebar";
import VacationRequest from "@/components/admin/vacations/VacationsDashboard";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <VacationRequest />
      </div>
    </>
  );
};

export default Home;
