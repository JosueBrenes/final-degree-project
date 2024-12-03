import Sidebar from "@/layouts/Sidebar";
import InventoryTable from "@/components/admin/inventory/InventoryTable";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <InventoryTable />
      </div>
    </>
  );
};

export default Home;
