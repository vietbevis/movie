import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavigationHeader = ({
  episode,
  categoryOrCountry,
  nameMovie,
  query,
  className,
}: any) => {
  return (
    <div className={cn("min-w-[348px] container p-0", className)}>
      <div className="p-2 rounded-lg w-full dark:bg-dark1 bg-bgEE">
        <div className="bg-background p-2 rounded-sm">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="dark:hover:text-white transition-all hover:text-black/40">
                <Link href="/" className="text-nowrap min-w-16">
                  Trang chủ
                </Link>
              </BreadcrumbItem>
              {query && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="dark:hover:text-white transition-all hover:text-black/40">
                    <p className="line-clamp-1 min-w-14 dark:text-white text-primary font-medium">
                      {query}
                    </p>
                  </BreadcrumbItem>
                </>
              )}
              {nameMovie?.slug && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="dark:hover:text-white transition-all hover:text-black/40">
                    <Link
                      href={`/xem-phim/${nameMovie.slug}`}
                      className={`line-clamp-1 ${
                        !episode &&
                        "dark:text-white text-primary font-medium pointer-events-none"
                      }`}
                    >
                      {nameMovie.name}
                    </Link>
                  </BreadcrumbItem>
                </>
              )}
              {episode && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="dark:hover:text-white transition-all hover:text-black/40">
                    <p className="line-clamp-1 min-w-14 dark:text-white text-primary font-medium">
                      {episode.toLowerCase() === "full"
                        ? "Full"
                        : `Tập ${episode}`}
                    </p>
                  </BreadcrumbItem>
                </>
              )}
              {categoryOrCountry && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="dark:hover:text-white transition-all hover:text-black/40">
                    <p className="line-clamp-1 dark:text-white text-primary font-medium">
                      {categoryOrCountry}
                    </p>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
