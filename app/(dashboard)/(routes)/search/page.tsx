import prisma from "@/lib/prismadb";
import Categories from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/");
  }

  const title = searchParams.title as string | undefined;
  const categoryId = searchParams.categoryId as string | undefined;

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId: currentUser.id,
    title,
    categoryId,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
