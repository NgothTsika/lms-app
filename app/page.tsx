// // app/page.tsx
import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function HomeRedirect() {
  const user = await getCurrentUser();
  return redirect(user ? "/dashboard" : "/auth");
}
