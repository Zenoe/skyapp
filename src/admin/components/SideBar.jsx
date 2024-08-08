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

export function SideBar() {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute scrollbar-hidden top-0 overflow-y-auto pb-4 flex-col gpa-2 px-2 hidden lg:flex">
        <LargeSidebarSection visibleItemCount={3} title="Hi">
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
          className="flex w-full"
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
        `p-3 px-1 flex w-full rounded-lg gap-1 items-center ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`,
      )}
    >
      {typeof Icon === "string" ? (
        <img src={Icon} className="w-6 h-6" />
      ) : (
        <Icon className="w-6 h-6" />
      )}

      <div className="text-sm">{title}</div>
    </a>
  );
}
