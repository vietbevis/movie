"use client";

import React, { use, useEffect, useState } from "react";
import { Input } from "../ui/input";
import checkImage, { cn } from "@/lib/utils";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDebounce from "@/hooks/useDebounce";
import { MovieListResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Search = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState<string>("");
  const queryDebounce = useDebounce(query, 500);
  const [data, setData] = useState<MovieListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (values: FormData | string) => {
    let query = "";
    if (typeof values === "string") {
      query = values;
    } else {
      query = values.get("search") as string;
    }
    const res = await fetch(
      `https://apii.online/apii/danh-sach?page=1&search=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("====================================");
    console.log("Search: ", queryDebounce);
    console.log("====================================");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (queryDebounce) {
        setLoading(true);
        const result = await handleSearch(queryDebounce);
        setData(result);
        setLoading(false);
      }
    };
    fetchData();
  }, [queryDebounce]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <SearchIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-2 bg-bgEE dark:bg-dark1">
        <div className="p-2 bg-background rounded-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">
              Tìm kiếm
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form className={cn("", className)} onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                name="search"
                placeholder="Nhập nội dung tìm kiếm..."
                className="pr-8 h-10 text-base"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                type={loading ? "button" : "submit"}
                className="absolute top-1/2 -translate-y-1/2 right-2 size-5"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <SearchIcon />
                )}
              </Button>
            </div>
            <div className="flex flex-col mt-4 mb-4">
              {data &&
                data?.items
                  .map((item) => (
                    <Link
                      href={`/xem-phim/${item.slug}`}
                      key={item._id}
                      className="flex items-center gap-2 bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer p-2 rounded-md transition-all"
                    >
                      <Image
                        src={checkImage(item.poster_url)}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="size-14 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="text-base font-bold line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm line-clamp-1">
                          {item.origin_name}
                        </p>
                      </div>
                    </Link>
                  ))
                  .slice(0, 5)}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
