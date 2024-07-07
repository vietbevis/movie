import React from "react";
import { cn } from "@/lib/utils";

const Divider = ({
  layout,
  className,
}: {
  layout?: "vertical";
  className?: string;
}) => {
  if (layout === "vertical") {
    return (
      <div className={cn("dark:bg-dark1 bg-bgEE w-px h-full", className)}></div>
    );
  }
  return (
    <div className={cn("dark:bg-dark1 bg-bgEE h-px w-full", className)}></div>
  );
};

export default Divider;
