import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";

import Logo from "@/assets/logo.jpg";
import { useSidebarContext } from "@/context/SidebarContext";
import { Button } from "../../components/Button";
import { useState } from "react";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageheaderFirstSection />
      <form
        className={`gap-4 justify-center grow ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}
      >
        <Button
          className="md:hidden"
          size="icon"
          variant="ghost"
          type="button"
          onClick={() => {
            setShowFullWidthSearch(false);
          }}
        >
          <ArrowLeft />
        </Button>
        <div className="flex grow max-w-[600px]">
          <input
            type="search"
            placeholder="search"
            className="rounded-l-full border border-secondary-border px-4 py-1 shadow-inner shadow-secondary w-full focus:border-blue-500 outline-none text-lg"
          />
          <Button className="rounded-r-full border border-secondary-border border-l-0 shrink-0">
            <Search />
          </Button>
          <Button size="icon">
            <Mic />
          </Button>
        </div>
      </form>
      <div
        className={`flex shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => {
            setShowFullWidthSearch(true);
          }}
        >
          <Search />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
}

export function PageheaderFirstSection({ hidden = false }) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`gap-4 items-center shrink-0 ${hidden ? "hidden" : "flex"}`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>

      <a href="/">
        <img src={Logo} className="h-6" />
      </a>
    </div>
  );
}
