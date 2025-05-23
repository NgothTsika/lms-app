"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  FcAutomatic,
  FcCalculator,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Engineering: FcEngineering,
  Fitness: FcSportsMode,
  Photography: FcOldTimeCamera,
  Accounting: FcSalesPerformance,
  Filming: FcFilmReel,
  Math: FcCalculator,
  Physique: FcAutomatic,
  "Computer Science": FcMultipleDevices,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className=" flex items-center gap-x-2 overflow-x-auto hide-scrollbar pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
