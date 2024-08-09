import { useRef, useState, useEffect } from "react";
import { formatDuration } from "../../utils/formatDuration";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}) {
  const [isVideoPlaying, setIsVidwoPlaying] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap2 "
      onMouseEnter={() => {
        setIsVidwoPlaying(true);
      }}
      onMouseLeave={() => {
        setIsVidwoPlaying(false);
      }}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className="block h-full w-full object-cover rounded-xl"
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`}>
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
