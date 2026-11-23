"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const RouteTypographyWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <div className={!isHomepage ? "non-homepage-pages" : undefined}>
      {children}
    </div>
  );
};
