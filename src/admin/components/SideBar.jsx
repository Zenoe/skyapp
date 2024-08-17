import {
  Home,
  Repeat,
  Clapperboard,
  Library,
  ChevronUp,
  ChevronDown,
  History,
  PlaySquare,
  ListVideo,
} from "lucide-react";
import { buttonStyles } from "../../components/Button";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button";
import { Children, useState } from "react";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "@/context/SidebarContext";
import { PageheaderFirstSection } from "./PageHeader";
export function SideBar() {
  const { isSmallOpen, isLargeOpen, close } = useSidebarContext();
  console.log("isisSmallOpen:", isSmallOpen, "isisLargeOpen:", isLargeOpen);
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"} `}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}

      <aside
        className={`w-56 lg:sticky absolute scrollbar-hidden top-0 overflow-y-auto pb-4 flex-col gpa-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        {isSmallOpen ? (
          <div className="lg:hiden pt-2 pb-4 px-2 sticky top-0 bg-white">
            <PageheaderFirstSection />
          </div>
        ) : null}
        <LargeSidebarSection visibleItemCount={3}>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
          <LargeSidebarItem
            Icon={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
          <LargeSidebarItem Icon={Library} title="Library" url="/library" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Hi two" visibleItemCount={5}>
          <LargeSidebarItem Icon={Library} title="Library" url="/library" />
          <LargeSidebarItem Icon={History} title="History" url="/history" />
          <LargeSidebarItem
            Icon={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              Icon={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={5}>
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              Icon={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
      </aside>
    </>
  );
}

function SmallSidebarItem({ Icon, title, url }) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col rounded-lg gap-1 items-center",
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

function LargeSidebarSection({ children, title, visibleItemCount }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArr = Children.toArray(children).flat();
  const showExpandedButton = childrenArr.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArr
    : childrenArr.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-2 mt-2 text-lg mb-1">{title}</div>}
      <div>{visibleChildren}</div>
      {showExpandedButton && (
        <Button
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
          onClick={() => {
            /* setIsExpanded(!isExpanded); */
            /*learn*/
            setIsExpanded((e) => !e);
          }}
        >
          <ButtonIcon className="w-6 h-6" />
          <div> {isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

function LargeSidebarItem({ Icon, url, title, isActive }) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `p-3 gap-4 flex w-full rounded-lg gap-1 items-center ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`,
      )}
    >
      {typeof Icon === "string" ? (
        <img src={Icon} className="w-6 h-6 rounded-full" />
      ) : (
        <Icon className="w-6 h-6" />
      )}

      <div className="text-sm overflow-hidden text-ellipsis">{title}</div>
    </a>
  );
}
