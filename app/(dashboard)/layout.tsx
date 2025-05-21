import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* Fixed Top Navbar with lower z-index */}
      <div className="h-[80px] md:pl-56 fixed top-0 w-full z-40">
        <Navbar />
      </div>

      {/* Fixed Sidebar with higher z-index */}
      <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
