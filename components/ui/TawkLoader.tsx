"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function TawkLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const w = window as any;
    w.Tawk_API = w.Tawk_API || {};
    
    // Fallback timeout in case onLoad doesn't fire or fails
    const timeout = setTimeout(() => setIsLoaded(true), 10000);

    w.Tawk_API.onLoad = function () {
      setIsLoaded(true);
      clearTimeout(timeout);
    };

    // If already loaded
    if (document.querySelector('iframe[title="chat widget"]')) {
      setIsLoaded(true);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Script id="tawk-to" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6a671e63e694901d4cd0678d/1juhctdfh';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>

      {!isLoaded && (
        <div className="fixed bottom-[20px] right-[20px] z-40 w-[60px] h-[60px] bg-slate-200 dark:bg-zinc-800 animate-pulse rounded-full shadow-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-slate-300 dark:bg-zinc-700 rounded-full animate-pulse" />
        </div>
      )}
    </>
  );
}
