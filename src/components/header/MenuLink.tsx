"use client";

import { categories, countries } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const menuItemsSimple = [
  {
    id: 1,
    name: "Trang chủ",
    url: "/",
  },
  {
    id: 2,
    name: "Phim bộ",
    url: "/the-loai/series",
  },
  {
    id: 3,
    name: "Phim lẻ",
    url: "/the-loai/single",
  },
  {
    id: 6,
    name: "Hoạt hình",
    url: "/the-loai/hoathinh",
  },
];

const menuItemsMulti = [
  {
    id: 4,
    name: "Thể loại",
    children: categories,
  },
  {
    id: 5,
    name: "Quốc gia",
    children: countries,
  },
];

const MenuLink = ({ className }: { className?: string }) => {
  const path = usePathname();
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {menuItemsSimple.map((item) => (
        <Button
          key={item.id}
          variant={"ghost"}
          className={`${
            path === item.url &&
            path !== "/the-loai/series" &&
            path !== "/the-loai/single" &&
            "text-blue-500 pointer-events-none"
          }`}
        >
          <Link href={item.url}>{item.name}</Link>
        </Button>
      ))}
      <NavigationMenu>
        <NavigationMenuList>
          {menuItemsMulti.map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] max-h-[500px] overflow-y-scroll scroll-hidden gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px]">
                  {item.children &&
                    item.children.map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={child.slug}
                          className="hover:text-blue-500 transition-all"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </ul>
  );
};

export default MenuLink;
