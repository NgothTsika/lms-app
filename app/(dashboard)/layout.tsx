const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full md:flex hidden w-56 flex-col fixed inset-y-0 z-50">
      {children}
    </div>
  );
};

export default DashboardLayout;
