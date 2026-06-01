"use client";

import { usePathname } from "next/navigation";

export function AdminExclusionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Do not render children (like Footer/Contact) on any /admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  return <>{children}</>;
}
