import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    currentUser.id
  );
  return (
    <div className="p-6 space-y-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
