import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logs } from "lucide-react";
import Logo from "@/components/logo/Logo";
import { categories, countries } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const MenuMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="size-10 p-2">
          <Logs />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-72">
        <SheetHeader>
          <SheetTitle>
            <Logo
              name="netflix"
              classNameContainer="flex items-center gap-3 text-2xl font-bold"
              classNameBrand="uppercase"
              classNameImg="w-12 h-12 md:w-14 md:h-14"
            />
          </SheetTitle>

          <SheetDescription>
            <ul className="flex flex-col gap-2">
              {menuItemsSimple.map((item) => (
                <Button
                  key={item.id}
                  variant={"ghost"}
                  className="justify-start text-base"
                >
                  <Link href={item.url}>{item.name}</Link>
                </Button>
              ))}

              <Accordion type="single" collapsible className="space-y-2">
                {menuItemsMulti.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.name}
                    className="border-none"
                  >
                    <AccordionTrigger className="px-4 rounded-md py-2 text-base hover:no-underline hover:bg-accent hover:text-accent-foreground">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className="h-72 pt-4">
                        <ul className="grid grid-cols-2 gap-2">
                          {item.children &&
                            item.children.map((child) => (
                              <li
                                key={child.id}
                                className="hover:text-blue-500 transition-colors"
                              >
                                <Link href={child.slug}>{child.name}</Link>
                              </li>
                            ))}
                        </ul>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuMobile;
