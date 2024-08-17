import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { CategoryPills } from "./components/CategoryPills";
import { PageHeader } from "./components/PageHeader";
import { SideBar } from "./components/SideBar";
import { VideoGridItem } from "./components/VideoGridItem";
import { categories, videos } from "./data/home";
import { SidebarProvider } from "@/context/SidebarContext";

function MyLayout() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
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
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default MyLayout;
