"use client";

import { useEffect, useState } from "react";

export function TawkLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only inject once
    if (document.getElementById("tawk-to-script")) {
      setIsLoaded(true);
      return;
    }

    const w = window as any;
    w.Tawk_API = w.Tawk_API || {};
    w.Tawk_LoadStart = new Date();

    // Position widget bottom-left
    w.Tawk_API.customStyle = {
      visibility: {
        desktop: { position: "bl", xOffset: 20, yOffset: 20 },
        mobile: { position: "bl", xOffset: 20, yOffset: 20 },
      },
    };

    // Fallback timeout
    const timeout = setTimeout(() => setIsLoaded(true), 10000);

    w.Tawk_API.onLoad = function () {
      setIsLoaded(true);
      clearTimeout(timeout);
    };

    // Inject script
    const s1 = document.createElement("script");
    s1.id = "tawk-to-script";
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a671e63e694901d4cd0678d/1juhctdfh";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.head.appendChild(s1);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="fixed bottom-[20px] left-[20px] z-40 w-[60px] h-[60px] bg-slate-200 dark:bg-zinc-800 animate-pulse rounded-full shadow-lg flex items-center justify-center">
      <div className="w-8 h-8 bg-slate-300 dark:bg-zinc-700 rounded-full animate-pulse" />
    </div>
  );
}
