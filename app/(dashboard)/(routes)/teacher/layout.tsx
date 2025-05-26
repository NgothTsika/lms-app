import { isTeacher } from "@/lib/teacher";
import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!isTeacher(currentUser?.id)) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default layout;
