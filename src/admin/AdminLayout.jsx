import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories, videos } from "./data/home";

import { CategoryPills } from "./components/CategoryPills";
import { PageHeader } from "./components/PageHeader";
import { SideBar } from "./components/SideBar";

function MyLayout() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] grow overflow-auto">
        <SideBar />
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLayout;
