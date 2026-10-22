"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { FullScreenMobileNavigation } from "./sterling-gate-kinetic-navigation";

const navItems = [
  { name: "Aperçu", href: "#hero" },
  { name: "Profil", href: "#profile" },
  { name: "Parcours", href: "#timeline" },
  { name: "Expériences", href: "#experiences" },
  { name: "Projets", href: "#projets" },
  { name: "Formation", href: "#formation" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

const containerVariants: Variants = {
  expanded: {
    width: "auto",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 280,
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  collapsed: {
    width: "5.5rem",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 280,
      staggerChildren: 0.02,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants: Variants = {
  expanded: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { type: "spring", damping: 18, stiffness: 300 } 
  },
  collapsed: { 
    opacity: 0, 
    x: -12, 
    scale: 0.95, 
    transition: { duration: 0.15 } 
  },
};

const collapsedLabelVariants: Variants = {
  expanded: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.12 }
  },
  collapsed: { 
    opacity: 1, 
    scale: 1,
    transition: { delay: 0.15, duration: 0.2 }
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navContainerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);

  // Auto-collapse when scrolling down, expand when back at the very top
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;
    
    // Scrolling down past 50px closes the menu smoothly
    if (isExpanded && latest > 50 && diff > 3) {
      setExpanded(false);
    } else if (!isExpanded && latest < 30) {
      // Returned back to the top of the page
      setExpanded(true);
    }
    
    lastScrollY.current = latest;
  });

  // Open on hover (desktop mouse only - ignore touch on iPad)
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      setExpanded(true);
    }
  };

  // Close when mouse exits container if user is scrolled down (desktop mouse only)
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && scrollY.get() > 30) {
      setExpanded(false);
    }
  };

  // Close when tapping/clicking outside on iPad or touch devices
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        if (scrollY.get() > 30) {
          setExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [scrollY]);

  return (
    <>
      {/* 1. Mobile Top Floating Bar: Dynamic Island centered pill with clear "Menu" label */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/95 dark:bg-white/95 text-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 rounded-full shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white dark:text-neutral-900 hover:opacity-80 active:scale-95 transition-all cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-4 h-4" />
            <span>Menu</span>
          </button>

          <span className="w-[1px] h-4 bg-white/20 dark:bg-black/20" aria-hidden="true" />

          <ThemeToggle className="border-0 bg-transparent hover:bg-transparent shadow-none text-white dark:text-neutral-900" />
        </div>
      </div>

      {/* 2. Desktop & iPad Floating Pill Navigation with Inverted Contrast */}
      <div 
        ref={navContainerRef}
        className="hidden md:block fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <motion.nav
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          onClick={(e) => {
            // If collapsed, clicking anywhere on the pill expands it
            if (!isExpanded) {
              e.stopPropagation();
              setExpanded(true);
            }
          }}
          className={cn(
            "relative flex items-center overflow-hidden rounded-full border border-neutral-800 dark:border-neutral-200 bg-black/95 dark:bg-white/95 text-white dark:text-neutral-900 shadow-xl backdrop-blur-md h-12 select-none px-2 transition-colors cursor-pointer",
            !isExpanded && "hover:border-neutral-600 dark:hover:border-neutral-400"
          )}
        >
          {/* Expanded Links with original stagger animation */}
          <motion.div
            className={cn(
              "flex items-center gap-1 pl-2 pr-1 whitespace-nowrap",
              !isExpanded && "pointer-events-none"
            )}
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.replace(/^#/, "");
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                  }
                  if (scrollY.get() > 30) {
                    setExpanded(false);
                  }
                  if (window.location.hash) {
                    history.replaceState(null, "", window.location.pathname);
                  }
                }}
                className="text-xs lg:text-[13px] font-medium text-neutral-400 hover:text-white dark:text-neutral-600 dark:hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-white/10 dark:hover:bg-black/10"
              >
                {item.name}
              </motion.a>
            ))}

            {/* Theme Toggle Button inside navbar */}
            <motion.div variants={itemVariants} className="flex items-center pr-1 pl-1">
              <ThemeToggle className="text-white hover:bg-white/15 dark:text-neutral-900 dark:hover:bg-black/10 border-0 bg-transparent shadow-none" />
            </motion.div>
          </motion.div>

          {/* Collapsed Pill label: Clean "Menu" button with onClick for iPad/touch */}
          <motion.button
            type="button"
            variants={collapsedLabelVariants}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
            className={cn(
              "absolute inset-0 w-full h-full flex items-center justify-center gap-1.5 text-xs font-semibold text-white dark:text-neutral-900 whitespace-nowrap cursor-pointer",
              isExpanded && "pointer-events-none"
            )}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-4 w-4" />
            <span>Menu</span>
          </motion.button>
        </motion.nav>
      </div>

      {/* Full-Screen Mobile Navigation Menu */}
      <FullScreenMobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
