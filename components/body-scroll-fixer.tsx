"use client";
import { useEffect } from "react";

export function BodyScrollFixer() {
  useEffect(() => {
    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }
    function adjustBodyPadding() {
      const body = document.body;
      // Sempre força overflow, pointer-events e margin-right corretos
      body.style.setProperty("overflow", "auto", "important");
      body.style.setProperty("pointer-events", "auto", "important");
      body.style.setProperty("marginRight", "0px", "important");
      body.style.setProperty("margin-right", "0px", "important");
      // Checa se existe data-scroll-locked (com ou sem valor)
      if (body.hasAttribute("data-scroll-locked")) {
        const scrollbarWidth = getScrollbarWidth();
        body.style.paddingRight =
          scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
      } else {
        body.style.paddingRight = "";
      }
    }
    const observer = new MutationObserver(adjustBodyPadding);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });
    window.addEventListener("resize", adjustBodyPadding);
    adjustBodyPadding();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", adjustBodyPadding);
    };
  }, []);
  return null;
}
