import { getAnalytics } from "@/actions/get-analytics";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";

const AnalyticsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(currentUser.id);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFomat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
