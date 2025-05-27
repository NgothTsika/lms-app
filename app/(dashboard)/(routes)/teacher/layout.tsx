import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "TEACHER") {
    return redirect("/");
  }

  return <>{children}</>;
}
