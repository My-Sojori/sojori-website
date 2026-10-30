"use client";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  type ReactNode,
  type MutableRefObject,
} from 'react';

interface ScrollPaginationDotsProps {
  children: ReactNode;
  itemCount: number;
  itemWidth?: number;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  /** When true (default), each direct child is full-width on mobile. Set false for custom slide widths (e.g. peek carousel). */
  fullWidthOnMobile?: boolean;
  /** Query slides inside the scroller for dot index + dot tap scroll. Default with peekCarousel: `[data-carousel-slide]`. */
  slideSelector?: string;
  /** Mobile: one slide + small peek of the next; adds shared CSS (globals.css). Implies fullWidthOnMobile false. */
  peekCarousel?: boolean;
}

export const ScrollPaginationDots = forwardRef<HTMLDivElement, ScrollPaginationDotsProps>(
  function ScrollPaginationDots(
    {
      children,
      itemCount,
      itemWidth: _itemWidth, // reserved for future slide width hints
      gap = 16,
      className = '',
      style = {},
      fullWidthOnMobile = true,
      slideSelector: slideSelectorProp,
      peekCarousel = false,
    },
    ref,
  ) {
  const effectiveFullWidth = peekCarousel ? false : fullWidthOnMobile;
  const slideSelector =
    slideSelectorProp ?? (peekCarousel ? '[data-carousel-slide]' : undefined);
  const mergedClass = [
    'scroll-pagination-container',
    peekCarousel ? 'scroll-pagination--peek' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const peekCssVars = peekCarousel
    ? ({
        ['--spd-slide-count' as string]: String(itemCount),
        ['--spd-gap' as string]: `${gap}px`,
      } as React.CSSProperties)
    : {};

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const assignScrollRef = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    if (ref == null) return;
    if (typeof ref === 'function') (ref as (el: HTMLDivElement | null) => void)(node);
    else (ref as MutableRefObject<HTMLDivElement | null>).current = node;
  };

  useEffect(() => {
    const handleScroll = () => {
      const root = scrollRef.current;
      if (!root) return;

      if (slideSelector) {
        const slides = [...root.querySelectorAll(slideSelector)] as HTMLElement[];
        if (slides.length === 0) return;
        const center = root.scrollLeft + root.clientWidth / 2;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        slides.forEach((el, i) => {
          const mid = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(center - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setCurrentIndex(Math.min(best, itemCount - 1));
        return;
      }

      const scrollLeft = root.scrollLeft;
      const containerWidth = root.offsetWidth;
      const index = Math.round(scrollLeft / Math.max(containerWidth, 1));
      setCurrentIndex(Math.min(index, itemCount - 1));
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [itemCount, slideSelector]);

  const scrollToIndex = (idx: number) => {
    const root = scrollRef.current;
    if (!root) return;
    if (slideSelector) {
      const slides = [...root.querySelectorAll(slideSelector)] as HTMLElement[];
      const el = slides[idx];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
      return;
    }
    const w = root.offsetWidth;
    root.scrollTo({ left: idx * w, behavior: 'smooth' });
  };

  return (
    <div
      className="scroll-pagination-root"
      {...(peekCarousel ? { 'data-peek-root': 'true' } : {})}
    >
      <div
        ref={assignScrollRef}
        data-full-width-mobile={effectiveFullWidth ? 'true' : 'false'}
        className={mergedClass}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          paddingBottom: 24,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139,92,246,0.3) rgba(255,255,255,0.05)",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: 'smooth',
          scrollSnapType:
            effectiveFullWidth || slideSelector || peekCarousel ? 'x mandatory' : 'none',
          ...peekCssVars,
          ...style,
        }}
      >
        {children}
      </div>

      {/* Pagination dots */}
      {itemCount > 1 && (
        <div
          className="scroll-pagination-dots"
          style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 8
        }}>
          {Array.from({ length: itemCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              style={{
                width: currentIndex === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: currentIndex === idx ? '#8b5cf6' : 'rgba(139,92,246,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to item ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        .scroll-pagination-container:not(.scroll-pagination--peek) > * {
          scroll-snap-align: start;
        }

        @media (max-width: 768px) {
          .scroll-pagination-container[data-full-width-mobile="true"] {
            gap: 0 !important;
            padding: 0 !important;
          }

          .scroll-pagination-container[data-full-width-mobile="true"] > * {
            min-width: 100% !important;
            max-width: 100% !important;
            flex-shrink: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
});

ScrollPaginationDots.displayName = 'ScrollPaginationDots';
