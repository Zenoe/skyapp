import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CategoryPills({ categories, selectedCategory, onSelect }) {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef(null);
  const TRANSLATE_AMOUNT = 200;

  useEffect(() => {
    if (containerRef.current == null) return;

    let container = containerRef.current;
    setIsLeftVisible(translate > 0);
    console.log(translate, container.clientWidth, container.scrollWidth);
    setIsRightVisible(
      translate + container.clientWidth < container.scrollWidth,
    );

    // this is a bit inscure
    // const observer = new ResizeObserver((entries) => {
    //   const container = entries[0]?.target;
    //   if (container === null) return;
    //   setIsLeftVisible(translate > 0);
    //   setIsRightVisible(
    //     translate + container.clientWidth < container.scrollWidth,
    //   );
    // });
    // observer.observe(containerRef.current);
    // return () => {
    //   observer.disconnect();
    // };
  }, [categories, translate]);
  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex gap-3 w-[max-content] transition-transform"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        /*h-full set height to 100%, prevent it from outsizing the container, which would cause the vertial scroll to appear*/
        <div className=" absolute h-full left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate < 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        /* flex justify-end makes the button to be on the right */
        <div className="absolute h-full right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef === null) return translate;
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const visibleWidth = containerRef.current.clientWidth;
                if (newTranslate + visibleWidth >= edge)
                  return edge - visibleWidth;
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
