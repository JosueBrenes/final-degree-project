import Sidebar from "@/layouts/Sidebar";
import RecruitmentTable from "@/components/admin/recruitment/RecruitmentTable";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <RecruitmentTable />
      </div>
    </>
  );
};

export default Home;
